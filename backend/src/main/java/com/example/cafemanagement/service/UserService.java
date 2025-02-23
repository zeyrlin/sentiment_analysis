package com.example.cafemanagement.service;

import com.example.cafemanagement.entity.Feedback;
import com.example.cafemanagement.entity.MenuItem;
import com.example.cafemanagement.entity.Order;
import com.example.cafemanagement.entity.Table;
import com.example.cafemanagement.entity.User;
import com.example.cafemanagement.repository.FeedbackRepository;
import com.example.cafemanagement.repository.MenuItemRepository;
import com.example.cafemanagement.repository.OrderRepository;
import com.example.cafemanagement.repository.TableRepository;
import com.example.cafemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private TableRepository tableRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // User Registration
    public void registerUser(String username, String password, String role) throws Exception {
        if (userRepository.existsByUsername(username)) {
            throw new Exception("Username already exists.");
        }
        User user = new User(username, passwordEncoder.encode(password), role);
        userRepository.save(user);
    }

    // User Login
    public String loginUser(String username, String password) throws Exception {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("Invalid username or password."));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new Exception("Invalid username or password.");
        }
        return generateToken(user); // Generate JWT token
    }

    // Place an Order
    public void placeOrder(String customerName, List<String> items, BigDecimal totalAmount, boolean redeemedLoyaltyPoints) {
        Order order = new Order(customerName, items, totalAmount, redeemedLoyaltyPoints, LocalDateTime.now());
        orderRepository.save(order);

        if (redeemedLoyaltyPoints) {
            User user = userRepository.findByUsername(customerName)
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
            user.setLoyaltyPoints(user.getLoyaltyPoints() - 100); // Example: Deduct 100 points
            userRepository.save(user);
        }
    }

    // Fetch Menu Items
    public List<MenuItem> getMenu() {
        return menuItemRepository.findAll();
    }

    // Submit Feedback
    public void submitFeedback(String review, String sentiment, String username) {
        Feedback feedback = new Feedback(review, sentiment, username);
        feedbackRepository.save(feedback);
    }

    // Get Loyalty Points Balance
    public int getLoyaltyPoints(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return user.getLoyaltyPoints();
    }

    // Add a new menu item
    public void addMenuItem(String name, String description, BigDecimal price, Boolean available) {
        MenuItem menuItem = new MenuItem(name, description, price, available);
        menuItemRepository.save(menuItem);
    }

    // Update an existing menu item
    public void updateMenuItem(Long id, String name, String description, BigDecimal price, Boolean available) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
        menuItem.setName(name);
        menuItem.setDescription(description);
        menuItem.setPrice(price);
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

    // Update order status
    public void updateOrderStatus(Long id, String customerName, List<String> items, BigDecimal totalAmount, boolean redeemedLoyaltyPoints) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setCustomerName(customerName);
        order.setItems(items);
        order.setTotalAmount(totalAmount);
        order.setRedeemedLoyaltyPoints(redeemedLoyaltyPoints);
        orderRepository.save(order);
    }

    // Get all tables
    public List<Table> getAllTables() {
        return tableRepository.findAll();
    }

    // Update table status
    public void updateTableStatus(Long id, String status, LocalDateTime reservationTime, String reservedBy) {
        Table table = tableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Table not found"));
        table.setStatus(status);
        table.setReservationTime(reservationTime);
        table.setReservedBy(reservedBy);
        tableRepository.save(table);
    }

    // Create a promotion (for demonstration purposes, this is a simple method)
    public void createPromotion(String description, Integer pointsRequired) {
        // For simplicity, this method doesn't store promotions in the database
        System.out.println("Promotion created: " + description + " - Points Required: " + pointsRequired);
    }

    // Analyze feedback sentiment
    public Map<String, Integer> getFeedbackSentimentAnalysis() {
        Map<String, Integer> sentimentCounts = new HashMap<>();
        sentimentCounts.put("positive", 10); // Example data
        sentimentCounts.put("negative", 5);  // Example data
        return sentimentCounts;
    }

    // Private Method to Generate Token
    private String generateToken(User user) {
        // Use a library like jjwt to generate JWT tokens in production
        return user.getUsername(); // Simplified for now
    }
}