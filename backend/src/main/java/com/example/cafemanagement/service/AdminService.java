package com.example.cafemanagement.service;

import com.example.cafemanagement.entity.MenuItem;
import com.example.cafemanagement.entity.Order;
import com.example.cafemanagement.repository.MenuItemRepository;
import com.example.cafemanagement.repository.OrderRepository;
import com.example.cafemanagement.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.math.BigDecimal;

@Service
public class AdminService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private TableRepository tableRepository;

    // Add a new menu item
    public void addMenuItem(String name, String description, BigDecimal price, Boolean available) {
        MenuItem menuItem = new MenuItem(name, description, price, available); // Use price directly
        menuItemRepository.save(menuItem);
    }

    // Update an existing menu item
    public void updateMenuItem(Long id, String name, String description, BigDecimal price, Boolean available) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
        menuItem.setName(name);
        menuItem.setDescription(description);
        menuItem.setPrice(price); // Use price directly
        menuItem.setAvailable(available);
        menuItemRepository.save(menuItem);
    }

    // Delete a menu item
    public void deleteMenuItem(Long id) {
        menuItemRepository.deleteById(id);
    }

    // Get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Update table status
    public void updateTableStatus(Long id, String status) {
        // Assuming you have a TableRepository and Table entity
        // Implement logic to update table status
    }

    // Create a promotion
    public void createPromotion(String description, Integer pointsRequired) {
        // Implement logic to store promotions in the database
    }

    // Analyze feedback sentiment
    public Map<String, Integer> getFeedbackSentimentAnalysis() {
        Map<String, Integer> sentimentCounts = new HashMap<>();
        sentimentCounts.put("positive", 10); // Example data
        sentimentCounts.put("negative", 5);  // Example data
        return sentimentCounts;
    }
}