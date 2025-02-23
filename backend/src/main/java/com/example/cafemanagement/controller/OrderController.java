package com.example.cafemanagement.controller;

import com.example.cafemanagement.entity.Order;
import com.example.cafemanagement.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3003") // Allow requests from React frontend
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<Page<Order>> getAllOrders(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "10") int size) {
        Page<Order> orderPage = orderService.getAllOrders(PageRequest.of(page, size));
        return ResponseEntity.ok(orderPage);
    }

    @PostMapping
    public ResponseEntity<String> addOrder(@RequestBody Order order) {
        orderService.addOrder(order);
        return ResponseEntity.ok("Order added successfully!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateOrder(@PathVariable Long id, @RequestBody Order order) {
        orderService.updateOrder(id, order);
        return ResponseEntity.ok("Order updated successfully!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok("Order deleted successfully!");
    }
}