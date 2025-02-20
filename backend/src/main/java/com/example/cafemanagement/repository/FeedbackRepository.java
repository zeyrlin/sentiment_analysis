package com.example.cafemanagement.repository;

import com.example.cafemanagement.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}