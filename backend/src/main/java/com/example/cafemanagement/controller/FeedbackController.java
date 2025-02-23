package com.example.cafemanagement.controller;

import com.example.cafemanagement.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Get all feedback
    @GetMapping("/all")
    public ResponseEntity<List<?>> getAllFeedback() {
        return ResponseEntity.ok(feedbackService.getAllFeedback());
    }
}