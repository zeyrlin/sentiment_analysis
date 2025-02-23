package com.example.cafemanagement.controller;

import com.example.cafemanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private UserService userService;

    // Fetch all menu items
    @GetMapping("/menu")
    public ResponseEntity<List<?>> getMenu() {
        return ResponseEntity.ok(userService.getMenu());
    }

    // Add a new menu item
    @PostMapping("/menu/add")
    public ResponseEntity<String> addMenuItem(@RequestBody Map<String, Object> menuItem) {
        String name = (String) menuItem.get("name");
        String description = (String) menuItem.get("description");
        Double priceDouble = (Double) menuItem.get("price");
        BigDecimal price = BigDecimal.valueOf(priceDouble);
        Boolean available = (Boolean) menuItem.get("available");

        userService.addMenuItem(name, description, price, available);
        return ResponseEntity.ok("Menu item added successfully!");
    }

    // Update an existing menu item
    @PutMapping("/menu/update/{id}")
    public ResponseEntity<String> updateMenuItem(@PathVariable Long id, @RequestBody Map<String, Object> menuItem) {
        String name = (String) menuItem.get("name");
        String description = (String) menuItem.get("description");
        Double priceDouble = (Double) menuItem.get("price");
        BigDecimal price = BigDecimal.valueOf(priceDouble);
        Boolean available = (Boolean) menuItem.get("available");

        userService.updateMenuItem(id, name, description, price, available);
        return ResponseEntity.ok("Menu item updated successfully!");
    }

    // Delete a menu item
    @DeleteMapping("/menu/delete/{id}")
    public ResponseEntity<String> deleteMenuItem(@PathVariable Long id) {
        userService.deleteMenuItem(id);
        return ResponseEntity.ok("Menu item deleted successfully!");
    }

    // View all orders
    @GetMapping("/orders")
    public ResponseEntity<List<?>> getAllOrders() {
        return ResponseEntity.ok(userService.getAllOrders());
    }

    // Update order status
    @PutMapping("/orders/update/{id}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, Object> orderDetails) {
        String customerName = (String) orderDetails.get("customerName");
        List<String> items = (List<String>) orderDetails.get("items");
        Double totalAmountDouble = (Double) orderDetails.get("totalAmount");
        BigDecimal totalAmount = BigDecimal.valueOf(totalAmountDouble);
        Boolean redeemedLoyaltyPoints = (Boolean) orderDetails.get("redeemedLoyaltyPoints");

        userService.updateOrderStatus(id, customerName, items, totalAmount, redeemedLoyaltyPoints);
        return ResponseEntity.ok("Order status updated successfully!");
    }

    // Get all tables
    @GetMapping("/tables")
    public ResponseEntity<List<?>> getAllTables() {
        return ResponseEntity.ok(userService.getAllTables());
    }

    // Update table status
    @PutMapping("/tables/update/{id}")
    public ResponseEntity<String> updateTableStatus(@PathVariable Long id, @RequestBody Map<String, Object> tableDetails) {
        String status = (String) tableDetails.get("status");
        LocalDateTime reservationTime = LocalDateTime.parse((String) tableDetails.get("reservationTime"));
        String reservedBy = (String) tableDetails.get("reservedBy");

        userService.updateTableStatus(id, status, reservationTime, reservedBy);
        return ResponseEntity.ok("Table status updated successfully!");
    }

    // Create a promotion with loyalty points
    @PostMapping("/promotion")
    public ResponseEntity<String> createPromotion(@RequestBody Map<String, Object> promotionDetails) {
        String description = (String) promotionDetails.get("description");
        Integer pointsRequired = (Integer) promotionDetails.get("pointsRequired");

        userService.createPromotion(description, pointsRequired);
        return ResponseEntity.ok("Promotion created successfully!");
    }

    // Analyze feedback sentiment
    @GetMapping("/feedback/sentiment")
    public ResponseEntity<Map<String, Integer>> getFeedbackSentimentAnalysis() {
        return ResponseEntity.ok(userService.getFeedbackSentimentAnalysis());
    }
}