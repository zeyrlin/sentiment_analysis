package com.example.cafemanagement.service;

import com.example.cafemanagement.entity.Feedback;
import com.example.cafemanagement.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Map;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private RestTemplate restTemplate;

    public String analyzeSentiment(String review) {
        String url = "http://localhost:5000/predict";
        Map<String, String> requestBody = Map.of("review", review);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, requestBody, Map.class);
            return (String) response.getBody().get("sentiment");
        } catch (HttpClientErrorException e) {
            // Log the error details
            System.err.println("HTTP Client Error: " + e.getStatusCode() + " - " + e.getStatusText());
            throw e;
        } catch (Exception e) {
            // Log the error details
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace(); // Print stack trace for detailed error information
            throw e;
        }
    }

    public void saveFeedback(String review) {
        String sentiment = analyzeSentiment(review);
        Feedback feedback = new Feedback(review, sentiment);
        feedbackRepository.save(feedback);
    }
}