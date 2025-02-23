// backend/src/main/java/com/example/cafemanagement/controller/UserController.java
package com.example.cafemanagement.controller;

import com.example.cafemanagement.repository.UserRepository;
import com.example.cafemanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    // Register a new user (customer or admin)
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> userDetails) {
        try {
            String username = userDetails.get("username");
            String password = userDetails.get("password");
            String role = userDetails.get("role");

            userService.registerUser(username, password, role);
            return ResponseEntity.ok("User registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    // Authenticate a user and generate a token
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        try {
            String token = userService.loginUser(username, password);
            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }
}