package com.example.E_comeerse.controller;

import com.example.E_comeerse.model.Pedido;
import com.example.E_comeerse.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public ResponseEntity<List<Pedido>> obtenerTodosLosPedidos() {
        List<Pedido> pedidos = pedidoService.obtenerTodosLosPedidos();
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> obtenerPedidoPorId(@PathVariable Long id) {
        Optional<Pedido> pedido = pedidoService.obtenerPedidoPorId(id);
        return pedido.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Pedido> crearPedido(@Valid @RequestBody Pedido pedido) {
        Pedido pedidoGuardado = pedidoService.guardarPedido(pedido);
        return ResponseEntity.status(HttpStatus.CREATED).body(pedidoGuardado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pedido> actualizarPedido(@PathVariable Long id, @Valid @RequestBody Pedido pedido) {
        Optional<Pedido> pedidoExistente = pedidoService.obtenerPedidoPorId(id);
        if (pedidoExistente.isPresent()) {
            pedido.setId(id);
            Pedido pedidoActualizado = pedidoService.guardarPedido(pedido);
            return ResponseEntity.ok(pedidoActualizado);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPedido(@PathVariable Long id) {
        Optional<Pedido> pedido = pedidoService.obtenerPedidoPorId(id);
        if (pedido.isPresent()) {
            pedidoService.eliminarPedido(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Pedido>> obtenerPedidosPorUsuario(@PathVariable Long idUsuario) {
        List<Pedido> pedidos = pedidoService.obtenerPedidosPorUsuario(idUsuario);
        return ResponseEntity.ok(pedidos);
    }

    /**
     * Obtener pedidos del usuario autenticado (para perfil de usuario)
     * GET /api/pedidos/mis-pedidos
     */
    @GetMapping("/mis-pedidos")
    public ResponseEntity<?> obtenerMisPedidos(
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            // Extraer el nombre de usuario del token JWT
            String token = authHeader.replace("Bearer ", "");
            String nombreUsuario = pedidoService.obtenerNombreUsuarioDeToken(token);
            
            // Obtener el ID del usuario por su nombre de usuario
            Long idUsuario = pedidoService.obtenerIdUsuarioPorNombre(nombreUsuario);
            
            if (idUsuario == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Usuario no encontrado");
            }
            
            List<Pedido> pedidos = pedidoService.obtenerPedidosPorUsuario(idUsuario);
            return ResponseEntity.ok(pedidos);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener pedidos: " + e.getMessage());
        }
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Pedido>> obtenerPedidosPorEstado(@PathVariable Pedido.EstadoPedido estado) {
        List<Pedido> pedidos = pedidoService.obtenerPedidosPorEstado(estado);
        return ResponseEntity.ok(pedidos);
    }

    // ========== ENDPOINTS PARA ADMINISTRACIÓN ==========

    /**
     * Obtener pedidos con filtros para administración
     * GET /api/pedidos/admin/lista?search=&estadoPedido=&estadoPago=
     */
    @GetMapping("/admin/lista")
    public ResponseEntity<?> obtenerPedidosAdmin(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String estadoPedido,
            @RequestParam(required = false) String estadoPago
    ) {
        try {
            return ResponseEntity.ok(pedidoService.obtenerPedidosConFiltros(search, estadoPedido, estadoPago));
        } catch (Exception e) {
            // Log the full exception
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener pedidos: " + e.getMessage());
        }
    }

    /**
     * Obtener detalle completo de un pedido
     * GET /api/pedidos/admin/{id}
     */
    @GetMapping("/admin/{id}")
    public ResponseEntity<?> obtenerDetallePedidoAdmin(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(pedidoService.obtenerDetallePedido(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Pedido no encontrado: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener pedido: " + e.getMessage());
        }
    }

    /**
     * Actualizar estado de un pedido
     * PUT /api/pedidos/admin/{id}/estado
     */
    @PutMapping("/admin/{id}/estado")
    public ResponseEntity<?> actualizarEstadoPedido(
            @PathVariable Long id,
            @Valid @RequestBody com.example.E_comeerse.dto.ActualizarEstadoPedidoDto dto
    ) {
        try {
            return ResponseEntity.ok(pedidoService.actualizarEstadoPedido(id, dto));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar pedido: " + e.getMessage());
        }
    }

    /**
     * Obtener estadísticas de pedidos
     * GET /api/pedidos/admin/stats
     */
    @GetMapping("/admin/stats")
    public ResponseEntity<?> obtenerEstadisticas() {
        try {
            return ResponseEntity.ok(pedidoService.obtenerEstadisticas());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener estadísticas: " + e.getMessage());
        }
    }
}
