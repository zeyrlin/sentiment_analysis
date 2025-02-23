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
    public ResponseEntity<?> getMenu(@RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "10") int size,
                                     @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(userService.getMenu(page, size));
    }

    // Place an order
    @PostMapping("/order/place")
    public ResponseEntity<String> placeOrder(@RequestBody Map<String, Object> orderDetails, @RequestHeader("Authorization") String token) {
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
    public ResponseEntity<String> submitFeedback(@RequestBody Map<String, String> feedbackDetails, @RequestHeader("Authorization") String token) {
        String review = feedbackDetails.get("review");
        String username = feedbackDetails.get("username");
        userService.submitFeedback(review, username);
        return ResponseEntity.ok("Feedback submitted successfully!");
    }

    // Check loyalty points balance
    @GetMapping("/loyalty-points/{username}")
    public ResponseEntity<Integer> getLoyaltyPoints(@PathVariable String username, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(userService.getLoyaltyPoints(username));
    }
}