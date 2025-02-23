package com.example.cafemanagement.service;

import com.example.cafemanagement.entity.Feedback;
import com.example.cafemanagement.entity.User;
import com.example.cafemanagement.repository.FeedbackRepository;
import com.example.cafemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestTemplate restTemplate;

    public String analyzeSentiment(String review) {
        String url = "http://localhost:5000/predict";
        Map<String, String> requestBody = Map.of("review", review);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, requestBody, Map.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                return (String) response.getBody().get("sentiment");
            } else {
                System.err.println("Flask API returned non-successful status: " + response.getStatusCode());
                throw new RuntimeException("Flask API returned non-successful status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public void saveFeedback(String review, String sentiment, String username) {
        Feedback feedback = new Feedback(review, sentiment, username);
        feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }
}