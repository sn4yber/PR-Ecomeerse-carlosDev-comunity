package com.example.E_comeerse.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Controlador para la gestión de carga de archivos
 * @author E-commerce Team
 * @created 2025-10-01
 */
@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class FileUploadController {

    // Directorio donde se guardarán las imágenes subidas
    @Value("${upload.path:uploads/productos}")
    private String uploadPath;

    /**
     * Endpoint para subir una imagen de producto
     * 
     * @param file Archivo de imagen a subir
     * @return ResponseEntity con la URL de la imagen subida
     */
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        System.out.println("=== INICIO UPLOAD FILE ===");
        System.out.println("Archivo recibido: " + (file != null ? file.getOriginalFilename() : "null"));
        System.out.println("Tamaño: " + (file != null ? file.getSize() : 0));
        System.out.println("Content Type: " + (file != null ? file.getContentType() : "null"));
        
        try {
            // Validar que el archivo no esté vacío
            if (file == null || file.isEmpty()) {
                System.err.println("ERROR: Archivo vacío o null");
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("El archivo está vacío"));
            }

            // Validar el tipo de archivo (solo imágenes)
            String contentType = file.getContentType();
            if (contentType == null || !isValidImageType(contentType)) {
                System.err.println("ERROR: Tipo de archivo inválido: " + contentType);
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("Solo se permiten archivos de imagen (JPG, JPEG, PNG)"));
            }

            // Validar el tamaño del archivo (máximo 5MB)
            long maxSize = 5 * 1024 * 1024; // 5MB en bytes
            if (file.getSize() > maxSize) {
                System.err.println("ERROR: Archivo muy grande: " + file.getSize());
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("El archivo no puede superar los 5MB"));
            }

            // Crear el directorio si no existe
            Path uploadDir = Paths.get(uploadPath).toAbsolutePath();
            System.out.println("Directorio de upload: " + uploadDir);
            
            if (!Files.exists(uploadDir)) {
                System.out.println("Creando directorio...");
                Files.createDirectories(uploadDir);
            }

            // Generar un nombre único para el archivo
            String originalFilename = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String newFilename = UUID.randomUUID().toString() + fileExtension;
            System.out.println("Nuevo nombre de archivo: " + newFilename);

            // Guardar el archivo
            Path filePath = uploadDir.resolve(newFilename);
            System.out.println("Ruta completa del archivo: " + filePath);
            
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Archivo guardado exitosamente");

            // Construir la URL de acceso al archivo
            String fileUrl = "/uploads/productos/" + newFilename;

            // Respuesta exitosa
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Archivo subido exitosamente");
            response.put("filename", newFilename);
            response.put("url", fileUrl);
            response.put("size", file.getSize());

            System.out.println("=== FIN UPLOAD FILE (EXITOSO) ===");
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            System.err.println("=== ERROR EN UPLOAD FILE ===");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Error al guardar el archivo: " + e.getMessage()));
        } catch (Exception e) {
            System.err.println("=== ERROR INESPERADO EN UPLOAD FILE ===");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Error inesperado: " + e.getMessage()));
        }
    }

    /**
     * Endpoint para eliminar una imagen
     * 
     * @param filename Nombre del archivo a eliminar
     * @return ResponseEntity con el resultado de la operación
     */
    @DeleteMapping("/delete/{filename}")
    public ResponseEntity<?> deleteFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadPath).resolve(filename);
            
            if (Files.exists(filePath)) {
                Files.delete(filePath);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Archivo eliminado exitosamente");
                
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(createErrorResponse("Archivo no encontrado"));
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Error al eliminar el archivo: " + e.getMessage()));
        }
    }

    /**
     * Endpoint para servir imágenes directamente
     *
     * @param filename Nombre del archivo de imagen
     * @return ResponseEntity con la imagen
     */
    @GetMapping("/serve/{filename}")
    public ResponseEntity<org.springframework.core.io.Resource> serveFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadPath).resolve(filename);
            org.springframework.core.io.Resource resource = new org.springframework.core.io.UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                // Determinar el tipo de contenido
                String contentType = "application/octet-stream";
                try {
                    contentType = Files.probeContentType(filePath);
                    if (contentType == null) {
                        // Fallback basado en extensión
                        String extension = filename.toLowerCase();
                        if (extension.endsWith(".jpg") || extension.endsWith(".jpeg")) {
                            contentType = "image/jpeg";
                        } else if (extension.endsWith(".png")) {
                            contentType = "image/png";
                        }
                    }
                } catch (Exception e) {
                    // Usar tipo por defecto si no se puede determinar
                }

                return ResponseEntity.ok()
                    .header("Content-Type", contentType)
                    .header("Cache-Control", "max-age=3600") // Cache por 1 hora
                    .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Endpoint para obtener información de un archivo
     *
     * @param filename Nombre del archivo
     * @return ResponseEntity con información del archivo
     */
    @GetMapping("/info/{filename}")
    public ResponseEntity<?> getFileInfo(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadPath).resolve(filename);

            if (Files.exists(filePath)) {
                Map<String, Object> fileInfo = new HashMap<>();
                fileInfo.put("filename", filename);
                fileInfo.put("size", Files.size(filePath));
                fileInfo.put("url", "/uploads/productos/" + filename);
                fileInfo.put("serveUrl", "/api/files/serve/" + filename);
                fileInfo.put("exists", true);

                return ResponseEntity.ok(fileInfo);
            } else {
                Map<String, Object> errorInfo = new HashMap<>();
                errorInfo.put("filename", filename);
                errorInfo.put("exists", false);
                errorInfo.put("message", "Archivo no encontrado");

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorInfo);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Error al obtener información del archivo: " + e.getMessage()));
        }
    }

    /**
     * Valida si el tipo de contenido es una imagen válida
     */
    private boolean isValidImageType(String contentType) {
        return contentType.equals("image/jpeg") || 
               contentType.equals("image/jpg") || 
               contentType.equals("image/png");
    }

    /**
     * Crea un mapa de respuesta de error
     */
    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("message", message);
        return error;
    }
}
