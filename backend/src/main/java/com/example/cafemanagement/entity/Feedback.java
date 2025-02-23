package com.example.cafemanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String review;

    @Column(nullable = false)
    private String sentiment;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Constructors
    public Feedback() {
        this.createdAt = LocalDateTime.now();
    }

    public Feedback(String review, String sentiment, String username) {
        this.review = review;
        this.sentiment = sentiment;
        this.username = username;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getSentiment() {
        return sentiment;
    }

    public void setSentiment(String sentiment) {
        this.sentiment = sentiment;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}