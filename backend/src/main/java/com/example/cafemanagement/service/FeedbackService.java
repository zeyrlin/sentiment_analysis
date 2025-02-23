package com.example.cafemanagement.service;

import com.example.cafemanagement.entity.Feedback;
import com.example.cafemanagement.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.lang.String;

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
            if (response.getStatusCode().is2xxSuccessful()) {
                return (String) response.getBody().get("sentiment");
            } else {
                System.err.println("Flask API returned non-successful status: " + response.getStatusCode());
                throw new RuntimeException("Flask API returned non-successful status: " + response.getStatusCode());
            }
        } catch (HttpClientErrorException e) {
            System.err.println("HTTP Client Error: " + e.getStatusCode() + " - " + e.getStatusText());
            throw e;
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public void saveFeedback(String review) {
        String sentiment = analyzeSentiment(review);
        Feedback feedback = new Feedback(review, sentiment);
        feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedback(PageRequest pageRequest) {
        return feedbackRepository.findAll();
    }
}