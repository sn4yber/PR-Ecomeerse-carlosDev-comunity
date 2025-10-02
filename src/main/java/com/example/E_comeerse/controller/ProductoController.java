package com.example.E_comeerse.controller;

import com.example.E_comeerse.model.Producto;
import com.example.E_comeerse.service.ProductoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ProductoController {

    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public ResponseEntity<List<Producto>> listarProductos() {
        List<Producto> productos = productoService.listarProductos();
        
        // Procesar URLs de imágenes para asegurar que sean relativas
        productos.forEach(producto -> {
            if (producto.getUrlImagen() != null && !producto.getUrlImagen().isEmpty()) {
                String urlImagen = producto.getUrlImagen();
                
                // Si la URL es completa (empieza con http), extraer solo la parte relativa
                if (urlImagen.startsWith("http://localhost:8080/uploads/")) {
                    producto.setUrlImagen(urlImagen.replace("http://localhost:8080", ""));
                }
                // Si la URL no empieza con /, agregarla
                else if (!urlImagen.startsWith("/")) {
                    // Extraer solo el nombre del archivo si es una ruta compleja
                    String filename = urlImagen;
                    if (urlImagen.contains("/")) {
                        filename = urlImagen.substring(urlImagen.lastIndexOf("/") + 1);
                    }
                    producto.setUrlImagen("/uploads/productos/" + filename);
                }
            }
        });
        
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable Long id) {
        Optional<Producto> producto = productoService.buscarPorId(id);
        return producto.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> crearProducto(@Valid @RequestBody Producto producto) {
        try {
            Producto productoGuardado = productoService.guardarProducto(producto);
            return ResponseEntity.status(HttpStatus.CREATED).body(productoGuardado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarProducto(@PathVariable Long id, @Valid @RequestBody Producto producto) {
        try {
            Producto productoActualizado = productoService.actualizarProducto(id, producto);
            return ResponseEntity.ok(productoActualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Long id) {
        try {
            productoService.eliminarProducto(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/categoria/{idCategoria}")
    public ResponseEntity<List<Producto>> obtenerProductosPorCategoria(@PathVariable Long idCategoria) {
        List<Producto> productos = productoService.buscarPorCategoria(idCategoria);
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Producto>> buscarProductos(@RequestParam String nombre) {
        List<Producto> productos = productoService.buscarPorNombre(nombre);
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/destacados")
    public ResponseEntity<List<Producto>> obtenerProductosDestacados() {
        List<Producto> productos = productoService.obtenerProductosDestacados();
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/destacados/top3")
    public ResponseEntity<List<Producto>> obtenerTop3Destacados() {
        List<Producto> productos = productoService.obtenerTop3Destacados();
        return ResponseEntity.ok(productos);
    }

    @PatchMapping("/{id}/destacado")
    public ResponseEntity<?> marcarComoDestacado(@PathVariable Long id, @RequestParam Boolean destacado) {
        try {
            Producto producto = productoService.marcarComoDestacado(id, destacado);
            return ResponseEntity.ok(producto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Endpoint para obtener productos con información completa de imágenes
     */
    @GetMapping("/admin")
    public ResponseEntity<List<Producto>> listarProductosAdmin() {
        List<Producto> productos = productoService.listarProductos();

        // Procesar URLs de imágenes para asegurar que sean completas
        productos.forEach(producto -> {
            if (producto.getUrlImagen() != null && !producto.getUrlImagen().isEmpty()) {
                String urlImagen = producto.getUrlImagen();

                // Si la URL no es completa, construir la URL completa
                if (!urlImagen.startsWith("http") && !urlImagen.startsWith("/api/files/serve/")) {
                    // Extraer solo el nombre del archivo si es una ruta
                    String filename = urlImagen;
                    if (urlImagen.contains("/")) {
                        filename = urlImagen.substring(urlImagen.lastIndexOf("/") + 1);
                    }

                    // Establecer la URL completa del servidor
                    producto.setUrlImagen("/uploads/productos/" + filename);
                }
            }
        });

        return ResponseEntity.ok(productos);
    }

    /**
     * Endpoint para validar que las imágenes de los productos existen
     */
    @GetMapping("/{id}/validate-image")
    public ResponseEntity<?> validateProductImage(@PathVariable Long id) {
        try {
            Optional<Producto> productoOpt = productoService.buscarPorId(id);
            if (productoOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Producto producto = productoOpt.get();
            Map<String, Object> response = new HashMap<>();
            response.put("productId", id);
            response.put("productName", producto.getNombre());

            if (producto.getUrlImagen() != null && !producto.getUrlImagen().isEmpty()) {
                String urlImagen = producto.getUrlImagen();
                response.put("imageUrl", urlImagen);

                // Extraer el nombre del archivo
                String filename = urlImagen;
                if (urlImagen.contains("/")) {
                    filename = urlImagen.substring(urlImagen.lastIndexOf("/") + 1);
                }

                // Verificar si el archivo existe físicamente
                java.nio.file.Path filePath = java.nio.file.Paths.get("uploads/productos").resolve(filename);
                boolean fileExists = java.nio.file.Files.exists(filePath);

                response.put("imageExists", fileExists);
                response.put("filename", filename);

                if (fileExists) {
                    try {
                        long fileSize = java.nio.file.Files.size(filePath);
                        response.put("fileSize", fileSize);
                    } catch (Exception e) {
                        response.put("fileSize", -1);
                    }
                }
            } else {
                response.put("imageUrl", null);
                response.put("imageExists", false);
                response.put("message", "Producto sin imagen asignada");
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Error al validar imagen: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
