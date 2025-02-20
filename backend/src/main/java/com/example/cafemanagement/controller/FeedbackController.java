package com.example.cafemanagement.controller;

import com.example.cafemanagement.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitFeedback(@RequestBody Map<String, String> request) {
        String review = request.get("review");
        if (review == null || review.isEmpty()) {
            return ResponseEntity.badRequest().body("Review cannot be empty");
        }
        feedbackService.saveFeedback(review);
        return ResponseEntity.ok("Feedback submitted successfully!");
    }
}