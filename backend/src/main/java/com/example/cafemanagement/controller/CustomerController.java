package com.example.cafemanagement.controller;

import com.example.cafemanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    @Autowired
    private UserService userService;

    // Fetch the menu for customers to browse
    @GetMapping("/menu")
    public ResponseEntity<List<?>> getMenu() {
        return ResponseEntity.ok(userService.getMenu());
    }

    // Place an order
    @PostMapping("/order/place")
    public ResponseEntity<String> placeOrder(@RequestBody Map<String, Object> orderDetails) {
        String customerName = (String) orderDetails.get("customerName");
        List<String> items = (List<String>) orderDetails.get("items");
        Double totalAmountDouble = (Double) orderDetails.get("totalAmount");
        BigDecimal totalAmount = BigDecimal.valueOf(totalAmountDouble);
        Boolean redeemedLoyaltyPoints = (Boolean) orderDetails.get("redeemedLoyaltyPoints");

        userService.placeOrder(customerName, items, totalAmount, redeemedLoyaltyPoints);
        return ResponseEntity.ok("Order placed successfully!");
    }

    // Submit feedback
    @PostMapping("/feedback/submit")
    public ResponseEntity<String> submitFeedback(@RequestBody Map<String, String> feedbackDetails) {
        String review = feedbackDetails.get("review");
        String sentiment = feedbackDetails.get("sentiment");
        String username = feedbackDetails.get("username");
        userService.submitFeedback(review, sentiment, username);
        return ResponseEntity.ok("Feedback submitted successfully!");
    }

    // Check loyalty points balance
    @GetMapping("/loyalty-points/{username}")
    public ResponseEntity<Integer> getLoyaltyPoints(@PathVariable String username) {
        return ResponseEntity.ok(userService.getLoyaltyPoints(username));
    }
}