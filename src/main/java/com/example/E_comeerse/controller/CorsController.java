package com.example.E_comeerse.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador para manejar solicitudes CORS OPTIONS
 */
@RestController
@CrossOrigin(origins = {
    "http://localhost:3000", 
    "http://localhost:5173", 
    "http://localhost:4173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:4173"
})
public class CorsController {

    @RequestMapping(method = RequestMethod.OPTIONS, value = "/**")
    public ResponseEntity<Void> handleOptions() {
        return ResponseEntity.ok().build();
    }
}
