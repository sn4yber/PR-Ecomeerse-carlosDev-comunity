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
@CrossOrigin(origins = "*")
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

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Pedido>> obtenerPedidosPorEstado(@PathVariable Pedido.EstadoPedido estado) {
        List<Pedido> pedidos = pedidoService.obtenerPedidosPorEstado(estado);
        return ResponseEntity.ok(pedidos);
    }
}
