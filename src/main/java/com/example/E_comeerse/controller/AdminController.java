package com.example.E_comeerse.controller;

import com.example.E_comeerse.dto.AdminUsuarioDto;
import com.example.E_comeerse.model.Usuario;
import com.example.E_comeerse.model.Producto;
import com.example.E_comeerse.model.Role;
import com.example.E_comeerse.service.UsuarioService;
import com.example.E_comeerse.service.ProductoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UsuarioService usuarioService;
    private final ProductoService productoService;

    @Autowired
    public AdminController(UsuarioService usuarioService, ProductoService productoService) {
        this.usuarioService = usuarioService;
        this.productoService = productoService;
    }

    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> listarTodosLosUsuarios() {
        List<Usuario> usuarios = usuarioService.listarTodosLosUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping("/usuarios/crear")
    public ResponseEntity<?> crearUsuarioAdmin(@Valid @RequestBody AdminUsuarioDto usuarioDto) {
        try {
            Usuario nuevoUsuario = usuarioService.crearUsuarioConRol(usuarioDto);
            return ResponseEntity.ok(nuevoUsuario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear el usuario: " + e.getMessage());
        }
    }

    @PutMapping("/usuarios/{id}/promover")
    public ResponseEntity<?> promoverUsuario(@PathVariable Long id) {
        try {
            Usuario usuarioPromovido = usuarioService.promoverAAdmin(id);
            return ResponseEntity.ok("Usuario promovido a administrador: " + usuarioPromovido.getNombreUsuario());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al promover usuario: " + e.getMessage());
        }
    }

    // === GESTIÓN DE PRODUCTOS ===

    /**
     * Obtener todos los productos para el panel de administrador
     */
    @GetMapping("/productos")
    public ResponseEntity<List<Producto>> listarProductosAdmin() {
        List<Producto> productos = productoService.listarProductos();
        return ResponseEntity.ok(productos);
    }

    /**
     * Crear un nuevo producto desde el panel de administrador
     */
    @PostMapping("/productos")
    public ResponseEntity<?> crearProductoAdmin(@Valid @RequestBody Producto producto) {
        try {
            Producto productoGuardado = productoService.guardarProducto(producto);
            return ResponseEntity.status(HttpStatus.CREATED).body(productoGuardado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                new ErrorResponse("Error al crear producto", e.getMessage())
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ErrorResponse("Error interno", "Error inesperado al crear el producto")
            );
        }
    }

    /**
     * Actualizar un producto existente desde el panel de administrador
     */
    @PutMapping("/productos/{id}")
    public ResponseEntity<?> actualizarProductoAdmin(@PathVariable Long id, @Valid @RequestBody Producto producto) {
        try {
            Producto productoActualizado = productoService.actualizarProducto(id, producto);
            return ResponseEntity.ok(productoActualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                new ErrorResponse("Error al actualizar producto", e.getMessage())
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ErrorResponse("Error interno", "Error inesperado al actualizar el producto")
            );
        }
    }

    /**
     * Eliminar un producto desde el panel de administrador
     */
    @DeleteMapping("/productos/{id}")
    public ResponseEntity<?> eliminarProductoAdmin(@PathVariable Long id) {
        try {
            productoService.eliminarProducto(id);
            return ResponseEntity.ok(new SuccessResponse("Producto eliminado correctamente"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                new ErrorResponse("Error al eliminar producto", e.getMessage())
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ErrorResponse("Error interno", "Error inesperado al eliminar el producto")
            );
        }
    }

    /**
     * Obtener un producto específico para edición
     */
    @GetMapping("/productos/{id}")
    public ResponseEntity<?> obtenerProductoAdmin(@PathVariable Long id) {
        try {
            return productoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ErrorResponse("Error interno", "Error al obtener el producto")
            );
        }
    }

    @GetMapping("/productos/estadisticas")
    public ResponseEntity<?> obtenerEstadisticasProductos() {
        try {
            List<Producto> productos = productoService.listarProductos();

            // Estadísticas básicas
            int totalProductos = productos.size();
            int productosEnStock = (int) productos.stream()
                .filter(p -> p.getCantidadStock() > 0)
                .count();
            int productosSinStock = totalProductos - productosEnStock;

            EstadisticasResponse estadisticas = new EstadisticasResponse(
                totalProductos,
                productosEnStock,
                productosSinStock
            );

            return ResponseEntity.ok(estadisticas);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ErrorResponse("Error interno", "Error al obtener estadísticas")
            );
        }
    }

    @PutMapping("/productos/{id}/stock")
    public ResponseEntity<?> actualizarStock(@PathVariable Long id, @RequestParam Integer nuevoStock) {
        try {
            if (nuevoStock < 0) {
                return ResponseEntity.badRequest().body(
                    new ErrorResponse("Stock inválido", "El stock no puede ser negativo")
                );
            }

            Optional<Producto> productoOpt = productoService.buscarPorId(id);
            if (productoOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Producto producto = productoOpt.get();
            producto.setCantidadStock(nuevoStock);
            Producto productoActualizado = productoService.actualizarProducto(id, producto);

            return ResponseEntity.ok(new StockResponse(
                "Stock actualizado correctamente",
                productoActualizado.getId(),
                productoActualizado.getNombre(),
                nuevoStock
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ErrorResponse("Error interno", "Error al actualizar stock")
            );
        }
    }

    // Clases auxiliares para respuestas
    public static class ErrorResponse {
        private final String error;
        private final String message;

        public ErrorResponse(String error, String message) {
            this.error = error;
            this.message = message;
        }

        public String getError() { return error; }
        public String getMessage() { return message; }
    }

    public static class SuccessResponse {
        private final String message;

        public SuccessResponse(String message) {
            this.message = message;
        }

        public String getMessage() { return message; }
    }

    public static class EstadisticasResponse {
        private final int totalProductos;
        private final int productosEnStock;
        private final int productosSinStock;

        public EstadisticasResponse(int totalProductos, int productosEnStock, int productosSinStock) {
            this.totalProductos = totalProductos;
            this.productosEnStock = productosEnStock;
            this.productosSinStock = productosSinStock;
        }

        public int getTotalProductos() { return totalProductos; }
        public int getProductosEnStock() { return productosEnStock; }
        public int getProductosSinStock() { return productosSinStock; }
    }

    public static class StockResponse {
        private final String message;
        private final Long productoId;
        private final String nombreProducto;
        private final Integer nuevoStock;

        public StockResponse(String message, Long productoId, String nombreProducto, Integer nuevoStock) {
            this.message = message;
            this.productoId = productoId;
            this.nombreProducto = nombreProducto;
            this.nuevoStock = nuevoStock;
        }

        public String getMessage() { return message; }
        public Long getProductoId() { return productoId; }
        public String getNombreProducto() { return nombreProducto; }
        public Integer getNuevoStock() { return nuevoStock; }
    }
}
