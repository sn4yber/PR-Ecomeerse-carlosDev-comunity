package com.example.E_comeerse.controller;

import com.example.E_comeerse.dto.ActualizarCantidadRequest;
import com.example.E_comeerse.dto.AgregarProductoRequest;
import com.example.E_comeerse.dto.CarritoDto;
import com.example.E_comeerse.dto.CheckoutRequest;
import com.example.E_comeerse.dto.FacturaDto;
import com.example.E_comeerse.security.UserPrincipal;
import com.example.E_comeerse.service.CarritoService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controlador REST para la gestión del carrito de compras.
 * Proporciona endpoints para todas las operaciones del carrito.
 * 
 * Principios SOLID aplicados:
 * - Single Responsibility: Solo maneja peticiones HTTP del carrito
 * - Dependency Inversion: Depende de la abstracción CarritoService
 * - Open/Closed: Extensible agregando nuevos endpoints
 * 
 * @author E-commerce Team
 * @version 1.0
 * @since 2025-10-13
 */
@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CarritoController {

    private static final Logger logger = LoggerFactory.getLogger(CarritoController.class);

    private final CarritoService carritoService;

    @Autowired
    public CarritoController(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    /**
     * Obtiene el carrito del usuario autenticado
     * 
     * @param authentication Información de autenticación
     * @return ResponseEntity con el carrito del usuario
     */
    @GetMapping
    public ResponseEntity<CarritoDto> obtenerCarrito(Authentication authentication) {
        try {
            Long idUsuario = obtenerIdUsuario(authentication);
            logger.debug("Obteniendo carrito para usuario: {}", idUsuario);
            
            CarritoDto carrito = carritoService.obtenerOCrearCarrito(idUsuario);
            return ResponseEntity.ok(carrito);
        } catch (Exception e) {
            logger.error("Error al obtener el carrito", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Obtiene la cantidad de items en el carrito
     * 
     * @param authentication Información de autenticación
     * @return ResponseEntity con la cantidad de items
     */
    @GetMapping("/cantidad")
    public ResponseEntity<Map<String, Integer>> obtenerCantidadItems(Authentication authentication) {
        try {
            Long idUsuario = obtenerIdUsuario(authentication);
            Integer cantidad = carritoService.obtenerCantidadItems(idUsuario);
            
            Map<String, Integer> response = new HashMap<>();
            response.put("cantidad", cantidad);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error al obtener cantidad de items", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Agrega un producto al carrito
     * 
     * @param authentication Información de autenticación
     * @param request Datos del producto a agregar
     * @return ResponseEntity con el carrito actualizado
     */
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarProducto(
            Authentication authentication,
            @Valid @RequestBody AgregarProductoRequest request) {
        try {
            Long idUsuario = obtenerIdUsuario(authentication);
            logger.debug("Agregando producto {} al carrito del usuario {}", 
                    request.getIdProducto(), idUsuario);
            
            CarritoDto carrito = carritoService.agregarProducto(
                    idUsuario, 
                    request.getIdProducto(), 
                    request.getCantidad()
            );
            
            return ResponseEntity.ok(carrito);
        } catch (IllegalArgumentException e) {
            logger.warn("Error al agregar producto: {}", e.getMessage());
            return ResponseEntity.badRequest().body(crearMensajeError(e.getMessage()));
        } catch (Exception e) {
            logger.error("Error inesperado al agregar producto", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(crearMensajeError("Error al agregar el producto al carrito"));
        }
    }

    /**
     * Actualiza la cantidad de un producto en el carrito
     * 
     * @param authentication Información de autenticación
     * @param idProducto ID del producto
     * @param request Nueva cantidad
     * @return ResponseEntity con el carrito actualizado
     */
    @PutMapping("/producto/{idProducto}")
    public ResponseEntity<?> actualizarCantidad(
            Authentication authentication,
            @PathVariable Long idProducto,
            @Valid @RequestBody ActualizarCantidadRequest request) {
        try {
            Long idUsuario = obtenerIdUsuario(authentication);
            logger.debug("Actualizando cantidad del producto {} a {} para el usuario {}", 
                    idProducto, request.getCantidad(), idUsuario);
            
            CarritoDto carrito = carritoService.actualizarCantidad(
                    idUsuario, 
                    idProducto, 
                    request.getCantidad()
            );
            
            return ResponseEntity.ok(carrito);
        } catch (IllegalArgumentException e) {
            logger.warn("Error al actualizar cantidad: {}", e.getMessage());
            return ResponseEntity.badRequest().body(crearMensajeError(e.getMessage()));
        } catch (Exception e) {
            logger.error("Error inesperado al actualizar cantidad", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(crearMensajeError("Error al actualizar la cantidad"));
        }
    }

    /**
     * Elimina un producto del carrito
     * 
     * @param authentication Información de autenticación
     * @param idProducto ID del producto a eliminar
     * @return ResponseEntity con el carrito actualizado
     */
    @DeleteMapping("/producto/{idProducto}")
    public ResponseEntity<?> eliminarProducto(
            Authentication authentication,
            @PathVariable Long idProducto) {
        try {
            Long idUsuario = obtenerIdUsuario(authentication);
            logger.debug("Eliminando producto {} del carrito del usuario {}", 
                    idProducto, idUsuario);
            
            CarritoDto carrito = carritoService.eliminarProducto(idUsuario, idProducto);
            
            return ResponseEntity.ok(carrito);
        } catch (IllegalArgumentException e) {
            logger.warn("Error al eliminar producto: {}", e.getMessage());
            return ResponseEntity.badRequest().body(crearMensajeError(e.getMessage()));
        } catch (Exception e) {
            logger.error("Error inesperado al eliminar producto", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(crearMensajeError("Error al eliminar el producto del carrito"));
        }
    }

    /**
     * Vacía completamente el carrito
     * 
     * @param authentication Información de autenticación
     * @return ResponseEntity con el carrito vacío
     */
    @DeleteMapping("/vaciar")
    public ResponseEntity<?> vaciarCarrito(Authentication authentication) {
        try {
            Long idUsuario = obtenerIdUsuario(authentication);
            logger.debug("Vaciando carrito del usuario {}", idUsuario);
            
            CarritoDto carrito = carritoService.vaciarCarrito(idUsuario);
            
            return ResponseEntity.ok(carrito);
        } catch (IllegalArgumentException e) {
            logger.warn("Error al vaciar carrito: {}", e.getMessage());
            return ResponseEntity.badRequest().body(crearMensajeError(e.getMessage()));
        } catch (Exception e) {
            logger.error("Error inesperado al vaciar carrito", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(crearMensajeError("Error al vaciar el carrito"));
        }
    }

    /**
     * Verifica si hay stock disponible para todos los productos del carrito
     * 
     * @param authentication Información de autenticación
     * @return ResponseEntity con el estado del stock
     */
    @GetMapping("/verificar-stock")
    public ResponseEntity<Map<String, Boolean>> verificarStock(Authentication authentication) {
        try {
            Long idUsuario = obtenerIdUsuario(authentication);
            logger.debug("Verificando stock para el carrito del usuario {}", idUsuario);
            
            boolean stockDisponible = carritoService.verificarStockDisponible(idUsuario);
            
            Map<String, Boolean> response = new HashMap<>();
            response.put("stockDisponible", stockDisponible);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error al verificar stock", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Convierte el carrito en un pedido con datos de facturación
     * 
     * @param authentication Información de autenticación
     * @param checkoutRequest Datos de facturación del cliente
     * @return ResponseEntity con la factura generada
     */
    @PostMapping("/checkout")
    public ResponseEntity<?> realizarCheckout(
            Authentication authentication,
            @Valid @RequestBody CheckoutRequest checkoutRequest) {
        try {
            Long idUsuario = obtenerIdUsuario(authentication);
            logger.debug("Realizando checkout para el usuario {}", idUsuario);
            
            FacturaDto factura = carritoService.convertirAPedidoConFactura(idUsuario, checkoutRequest.getDatosFacturacion());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(factura);
        } catch (IllegalArgumentException e) {
            logger.warn("Error al realizar checkout: {}", e.getMessage());
            return ResponseEntity.badRequest().body(crearMensajeError(e.getMessage()));
        } catch (Exception e) {
            logger.error("Error inesperado al realizar checkout", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(crearMensajeError("Error al procesar el pedido"));
        }
    }

    /**
     * Obtiene el ID del usuario autenticado
     * 
     * @param authentication Información de autenticación
     * @return ID del usuario
     * @throws IllegalStateException si no se puede obtener el usuario
     */
    private Long obtenerIdUsuario(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new IllegalStateException("Usuario no autenticado");
        }

        Object principal = authentication.getPrincipal();
        
        if (principal instanceof UserPrincipal) {
            return ((UserPrincipal) principal).getId();
        }
        
        throw new IllegalStateException("No se pudo obtener el ID del usuario");
    }

    /**
     * Crea un mapa con mensaje de error
     * 
     * @param mensaje Mensaje de error
     * @return Map con el mensaje
     */
    private Map<String, String> crearMensajeError(String mensaje) {
        Map<String, String> error = new HashMap<>();
        error.put("error", mensaje);
        return error;
    }
}
