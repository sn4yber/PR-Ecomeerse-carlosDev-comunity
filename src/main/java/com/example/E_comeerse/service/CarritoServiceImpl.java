package com.example.E_comeerse.service;

import com.example.E_comeerse.dto.CarritoDto;
import com.example.E_comeerse.dto.CarritoItemDto;
import com.example.E_comeerse.dto.DatosFacturacionDto;
import com.example.E_comeerse.dto.FacturaDto;
import com.example.E_comeerse.model.*;
import com.example.E_comeerse.repository.CarritoItemRepository;
import com.example.E_comeerse.repository.CarritoRepository;
import com.example.E_comeerse.repository.PedidoRepository;
import com.example.E_comeerse.repository.ProductoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Implementación del servicio de Carrito.
 * Contiene la lógica de negocio para la gestión del carrito de compras.
 * 
 * Principios SOLID aplicados:
 * - Single Responsibility: Solo maneja lógica de carrito
 * - Open/Closed: Extensible sin modificar código existente
 * - Liskov Substitution: Implementa correctamente la interfaz
 * - Dependency Inversion: Depende de abstracciones (interfaces)
 * 
 * @author E-commerce Team
 * @version 1.0
 * @since 2025-10-13
 */
@Service
@Transactional
public class CarritoServiceImpl implements CarritoService {

    private static final Logger logger = LoggerFactory.getLogger(CarritoServiceImpl.class);

    private final CarritoRepository carritoRepository;
    private final CarritoItemRepository carritoItemRepository;
    private final ProductoRepository productoRepository;
    private final PedidoRepository pedidoRepository;

    @Autowired
    public CarritoServiceImpl(
            CarritoRepository carritoRepository,
            CarritoItemRepository carritoItemRepository,
            ProductoRepository productoRepository,
            PedidoRepository pedidoRepository) {
        this.carritoRepository = carritoRepository;
        this.carritoItemRepository = carritoItemRepository;
        this.productoRepository = productoRepository;
        this.pedidoRepository = pedidoRepository;
    }

    @Override
    public CarritoDto obtenerOCrearCarrito(Long idUsuario) {
        logger.debug("Obteniendo o creando carrito para usuario: {}", idUsuario);
        
        Carrito carrito = carritoRepository.findByIdUsuario(idUsuario)
                .orElseGet(() -> {
                    logger.info("Creando nuevo carrito para usuario: {}", idUsuario);
                    Carrito nuevoCarrito = new Carrito(idUsuario);
                    return carritoRepository.save(nuevoCarrito);
                });

        return convertirADto(carrito);
    }

    @Override
    public CarritoDto agregarProducto(Long idUsuario, Long idProducto, Integer cantidad) {
        logger.debug("Agregando producto {} con cantidad {} al carrito del usuario {}", 
                idProducto, cantidad, idUsuario);

        // Validar que el producto existe
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado con ID: " + idProducto));

        // Validar stock disponible
        if (producto.getCantidadStock() < cantidad) {
            throw new IllegalArgumentException("Stock insuficiente. Disponible: " + producto.getCantidadStock());
        }

        // Obtener o crear carrito
        Carrito carrito = carritoRepository.findByIdUsuario(idUsuario)
                .orElseGet(() -> {
                    Carrito nuevoCarrito = new Carrito(idUsuario);
                    return carritoRepository.save(nuevoCarrito);
                });

        // Buscar si el producto ya existe en el carrito
        Optional<CarritoItem> itemExistente = carritoItemRepository
                .findByCarrito_IdCarritoAndIdProducto(carrito.getIdCarrito(), idProducto);

        if (itemExistente.isPresent()) {
            // Actualizar cantidad del item existente
            CarritoItem item = itemExistente.get();
            Integer nuevaCantidad = item.getCantidad() + cantidad;
            
            // Validar stock para la nueva cantidad
            if (producto.getCantidadStock() < nuevaCantidad) {
                throw new IllegalArgumentException("Stock insuficiente. Disponible: " + producto.getCantidadStock());
            }
            
            item.actualizarCantidad(nuevaCantidad);
            carritoItemRepository.save(item);
            logger.info("Cantidad actualizada del producto {} en el carrito. Nueva cantidad: {}", 
                    idProducto, nuevaCantidad);
        } else {
            // Crear nuevo item
            CarritoItem nuevoItem = new CarritoItem(carrito, producto, cantidad);
            carritoItemRepository.save(nuevoItem);
            carrito.agregarItem(nuevoItem);
            logger.info("Producto {} agregado al carrito con cantidad: {}", idProducto, cantidad);
        }

        // Recalcular totales y guardar
        carrito.calcularTotales();
        carritoRepository.save(carrito);

        return convertirADto(carrito);
    }

    @Override
    public CarritoDto actualizarCantidad(Long idUsuario, Long idProducto, Integer nuevaCantidad) {
        logger.debug("Actualizando cantidad del producto {} a {} en el carrito del usuario {}", 
                idProducto, nuevaCantidad, idUsuario);

        // Obtener carrito
        Carrito carrito = carritoRepository.findByIdUsuario(idUsuario)
                .orElseThrow(() -> new IllegalArgumentException("Carrito no encontrado para el usuario: " + idUsuario));

        // Buscar item en el carrito
        CarritoItem item = carritoItemRepository
                .findByCarrito_IdCarritoAndIdProducto(carrito.getIdCarrito(), idProducto)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado en el carrito"));

        // Validar stock disponible
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));

        if (producto.getCantidadStock() < nuevaCantidad) {
            throw new IllegalArgumentException("Stock insuficiente. Disponible: " + producto.getCantidadStock());
        }

        // Actualizar cantidad
        item.actualizarCantidad(nuevaCantidad);
        carritoItemRepository.save(item);

        // Recalcular totales
        carrito.calcularTotales();
        carritoRepository.save(carrito);

        logger.info("Cantidad del producto {} actualizada a {} en el carrito", idProducto, nuevaCantidad);

        return convertirADto(carrito);
    }

    @Override
    public CarritoDto eliminarProducto(Long idUsuario, Long idProducto) {
        logger.debug("Eliminando producto {} del carrito del usuario {}", idProducto, idUsuario);

        // Obtener carrito
        Carrito carrito = carritoRepository.findByIdUsuario(idUsuario)
                .orElseThrow(() -> new IllegalArgumentException("Carrito no encontrado para el usuario: " + idUsuario));

        // Buscar y eliminar item
        CarritoItem item = carritoItemRepository
                .findByCarrito_IdCarritoAndIdProducto(carrito.getIdCarrito(), idProducto)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado en el carrito"));

        carrito.eliminarItem(item);
        carritoItemRepository.delete(item);

        // Recalcular totales
        carrito.calcularTotales();
        carritoRepository.save(carrito);

        logger.info("Producto {} eliminado del carrito", idProducto);

        return convertirADto(carrito);
    }

    @Override
    public CarritoDto vaciarCarrito(Long idUsuario) {
        logger.debug("Vaciando carrito del usuario {}", idUsuario);

        // Obtener carrito
        Carrito carrito = carritoRepository.findByIdUsuario(idUsuario)
                .orElseThrow(() -> new IllegalArgumentException("Carrito no encontrado para el usuario: " + idUsuario));

        // Limpiar la colección de items - JPA manejará la eliminación por orphanRemoval = true
        carrito.vaciarCarrito();
        carritoRepository.save(carrito);

        logger.info("Carrito del usuario {} vaciado exitosamente", idUsuario);

        return convertirADto(carrito);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CarritoDto> obtenerCarrito(Long idUsuario) {
        logger.debug("Obteniendo carrito del usuario {}", idUsuario);
        
        return carritoRepository.findByIdUsuario(idUsuario)
                .map(this::convertirADto);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean verificarStockDisponible(Long idUsuario) {
        logger.debug("Verificando stock disponible para el carrito del usuario {}", idUsuario);

        Carrito carrito = carritoRepository.findByIdUsuario(idUsuario)
                .orElse(null);

        if (carrito == null || carrito.estaVacio()) {
            return false;
        }

        // Verificar stock para cada item
        for (CarritoItem item : carrito.getItems()) {
            Producto producto = productoRepository.findById(item.getIdProducto())
                    .orElse(null);
            
            if (producto == null || producto.getCantidadStock() < item.getCantidad()) {
                logger.warn("Stock insuficiente para producto {}: requerido {}, disponible {}", 
                        item.getIdProducto(), 
                        item.getCantidad(), 
                        producto != null ? producto.getCantidadStock() : 0);
                return false;
            }
        }

        return true;
    }

    @Override
    public Long convertirAPedido(Long idUsuario) {
        logger.debug("Convirtiendo carrito a pedido para usuario {}", idUsuario);

        // Obtener carrito
        Carrito carrito = carritoRepository.findByIdUsuario(idUsuario)
                .orElseThrow(() -> new IllegalArgumentException("Carrito no encontrado para el usuario: " + idUsuario));

        if (carrito.estaVacio()) {
            throw new IllegalArgumentException("El carrito está vacío");
        }

        // Verificar stock
        if (!verificarStockDisponible(idUsuario)) {
            throw new IllegalArgumentException("Stock insuficiente para uno o más productos");
        }

        // Crear pedido
        String numeroPedido = "PED-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        Pedido pedido = new Pedido();
        pedido.setIdUsuario(idUsuario);
        pedido.setNumeroPedido(numeroPedido);
        pedido.setMontoTotal(carrito.getTotal());
        pedido.setMontoImpuestos(carrito.getImpuestos());
        pedido.setMontoDescuento(carrito.getDescuentoTotal());
        pedido.setEstadoPedido(Pedido.EstadoPedido.PENDIENTE);
        pedido.setEstadoPago(Pedido.EstadoPago.PENDIENTE);

        Pedido pedidoGuardado = pedidoRepository.save(pedido);

        // Reducir stock de productos
        for (CarritoItem item : carrito.getItems()) {
            Producto producto = productoRepository.findById(item.getIdProducto())
                    .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado: " + item.getIdProducto()));
            
            producto.setCantidadStock(producto.getCantidadStock() - item.getCantidad());
            productoRepository.save(producto);
        }

        // Vaciar carrito después de crear el pedido
        vaciarCarrito(idUsuario);

        logger.info("Pedido {} creado exitosamente desde el carrito del usuario {}", 
                numeroPedido, idUsuario);

        return pedidoGuardado.getId();
    }

    @Override
    @Transactional
    public FacturaDto convertirAPedidoConFactura(Long idUsuario, DatosFacturacionDto datosFacturacion) {
        logger.debug("Convirtiendo carrito a pedido con factura para usuario {}", idUsuario);

        // Obtener carrito
        Carrito carrito = carritoRepository.findByIdUsuario(idUsuario)
                .orElseThrow(() -> new IllegalArgumentException("Carrito no encontrado para el usuario: " + idUsuario));

        if (carrito.estaVacio()) {
            throw new IllegalArgumentException("El carrito está vacío");
        }

        // Verificar stock
        if (!verificarStockDisponible(idUsuario)) {
            throw new IllegalArgumentException("Stock insuficiente para uno o más productos");
        }

        // Crear pedido
        String numeroPedido = "PED-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String numeroTicket = String.format("#%06d", System.currentTimeMillis() % 1000000);
        
        Pedido pedido = new Pedido();
        pedido.setIdUsuario(idUsuario);
        pedido.setNumeroPedido(numeroPedido);
        pedido.setNumeroTicket(numeroTicket);
        pedido.setMontoTotal(carrito.getTotal());
        pedido.setMontoImpuestos(carrito.getImpuestos());
        pedido.setMontoDescuento(carrito.getDescuentoTotal());
        pedido.setEstadoPedido(Pedido.EstadoPedido.PENDIENTE);
        pedido.setEstadoPago(Pedido.EstadoPago.PENDIENTE);
        
        // Guardar datos de facturación
        pedido.setClienteNombre(datosFacturacion.getNombreCompleto());
        pedido.setClienteIdentificacion(datosFacturacion.getNumeroIdentificacion());
        pedido.setClienteTelefono(datosFacturacion.getTelefono());
        pedido.setClienteEmail(datosFacturacion.getEmail());
        pedido.setClienteDireccion(datosFacturacion.getDireccion());
        pedido.setClienteCiudad(datosFacturacion.getCiudad());
        pedido.setClientePais(datosFacturacion.getPais());
        pedido.setMetodoPago(datosFacturacion.getMetodoPago());

        Pedido pedidoGuardado = pedidoRepository.save(pedido);

        // Reducir stock de productos
        for (CarritoItem item : carrito.getItems()) {
            Producto producto = productoRepository.findById(item.getIdProducto())
                    .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado: " + item.getIdProducto()));
            
            producto.setCantidadStock(producto.getCantidadStock() - item.getCantidad());
            productoRepository.save(producto);
        }

        // Crear factura antes de vaciar el carrito
        FacturaDto factura = crearFactura(pedidoGuardado, carrito, datosFacturacion, numeroTicket);

        // Vaciar carrito después de crear el pedido
        vaciarCarrito(idUsuario);

        logger.info("Pedido {} creado exitosamente con factura {} desde el carrito del usuario {}", 
                numeroPedido, numeroTicket, idUsuario);

        return factura;
    }

    /**
     * Crea el DTO de factura con toda la información del pedido
     */
    private FacturaDto crearFactura(Pedido pedido, Carrito carrito, DatosFacturacionDto datosFacturacion, String numeroTicket) {
        // Convertir items del carrito a items de factura
        List<FacturaDto.ItemFactura> items = carrito.getItems().stream()
                .map(item -> FacturaDto.ItemFactura.builder()
                        .nombreProducto(item.getNombreProducto())
                        .cantidad(item.getCantidad())
                        .precioUnitario(item.getPrecioUnitario())
                        .subtotal(item.getSubtotal())
                        .descuento(item.getDescuento() != null ? item.getDescuento() : BigDecimal.ZERO)
                        .build())
                .collect(Collectors.toList());

        return FacturaDto.builder()
                .numeroTicket(numeroTicket)
                .numeroPedido(pedido.getNumeroPedido())
                .fecha(LocalDateTime.now())
                .cliente(datosFacturacion)
                .items(items)
                .subtotal(carrito.getSubtotal())
                .descuentoTotal(carrito.getDescuentoTotal())
                .impuestos(carrito.getImpuestos())
                .total(carrito.getTotal())
                .empresaNombre("NebulaTech - E-Commerce")
                .empresaNit("900.123.456-7")
                .empresaDireccion("Carrera 5 #10-50, Cartagena, Bolívar, Colombia")
                .empresaTelefono("(605) 660-1234")
                .empresaEmail("ventas@nebulatech.com")
                .empresaWeb("www.nebulatech.com")
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public Integer obtenerCantidadItems(Long idUsuario) {
        return carritoRepository.findByIdUsuario(idUsuario)
                .map(Carrito::obtenerCantidadTotal)
                .orElse(0);
    }

    /**
     * Convierte una entidad Carrito a su DTO
     * 
     * @param carrito Entidad carrito
     * @return DTO del carrito
     */
    private CarritoDto convertirADto(Carrito carrito) {
        CarritoDto dto = new CarritoDto();
        dto.setIdCarrito(carrito.getIdCarrito());
        dto.setIdUsuario(carrito.getIdUsuario());
        dto.setSubtotal(carrito.getSubtotal());
        dto.setDescuentoTotal(carrito.getDescuentoTotal());
        dto.setImpuestos(carrito.getImpuestos());
        dto.setTotal(carrito.getTotal());
        dto.setCantidadItems(carrito.getCantidadItems());
        dto.setFechaCreacion(carrito.getFechaCreacion());
        dto.setFechaModificacion(carrito.getFechaModificacion());

        // Convertir items con información de stock
        List<CarritoItemDto> itemsDto = carrito.getItems().stream()
                .map(this::convertirItemADto)
                .collect(Collectors.toList());
        dto.setItems(itemsDto);

        return dto;
    }

    /**
     * Convierte una entidad CarritoItem a su DTO con información de stock
     * 
     * @param item Entidad CarritoItem
     * @return DTO del item
     */
    private CarritoItemDto convertirItemADto(CarritoItem item) {
        CarritoItemDto dto = new CarritoItemDto();
        dto.setIdItem(item.getIdItem());
        dto.setIdProducto(item.getIdProducto());
        dto.setNombreProducto(item.getNombreProducto());
        dto.setUrlImagen(item.getUrlImagen());
        dto.setPrecioUnitario(item.getPrecioUnitario());
        dto.setCantidad(item.getCantidad());
        dto.setSubtotal(item.getSubtotal());
        dto.setDescuento(item.getDescuento());
        dto.setPorcentajeDescuento(item.getPorcentajeDescuento());
        dto.setFechaAgregado(item.getFechaAgregado());
        dto.setFechaModificacion(item.getFechaModificacion());

        // Agregar información de stock del producto
        productoRepository.findById(item.getIdProducto()).ifPresent(producto -> {
            dto.setStockDisponible(producto.getCantidadStock());
            dto.setDisponible(producto.getCantidadStock() >= item.getCantidad());
        });

        return dto;
    }
}
