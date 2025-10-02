package com.example.E_comeerse.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Controlador para servir imágenes de productos
 * Sirve archivos estáticos desde el directorio de uploads
 */
@RestController
@RequestMapping("/uploads/productos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:4173"})
public class ImageController {

    @Value("${upload.path:uploads/productos}")
    private String uploadPath;

    /**
     * Sirve una imagen de producto por su nombre de archivo
     * 
     * @param filename Nombre del archivo de imagen
     * @return ResponseEntity con la imagen
     */
    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> serveImage(@PathVariable String filename) {
        try {
            // Obtener la ruta del archivo
            Path filePath = Paths.get(uploadPath).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            // Verificar que el archivo existe y es legible
            if (resource.exists() && resource.isReadable()) {
                // Determinar el tipo de contenido basándose en la extensión
                String contentType = "application/octet-stream";
                String filenameLower = filename.toLowerCase();
                
                if (filenameLower.endsWith(".jpg") || filenameLower.endsWith(".jpeg")) {
                    contentType = "image/jpeg";
                } else if (filenameLower.endsWith(".png")) {
                    contentType = "image/png";
                } else if (filenameLower.endsWith(".gif")) {
                    contentType = "image/gif";
                } else if (filenameLower.endsWith(".webp")) {
                    contentType = "image/webp";
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CACHE_CONTROL, "max-age=31536000") // Cache por 1 año
                        .body(resource);
            } else {
                System.err.println("❌ Imagen no encontrada o no es legible: " + filePath);
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            System.err.println("❌ Error sirviendo imagen " + filename + ": " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
