package com.example.cafemanagement.controller;

import com.example.cafemanagement.entity.Feedback;
import com.example.cafemanagement.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
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

    @GetMapping("/all")
    public ResponseEntity<Page<Feedback>> getAllFeedback(@RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "10") int size) {
        Page<Feedback> feedbackList = (Page<Feedback>) feedbackService.getAllFeedback(PageRequest.of(page, size));
        return ResponseEntity.ok(feedbackList);
    }
}