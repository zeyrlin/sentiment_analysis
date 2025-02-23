package com.example.cafemanagement.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String customerName;

    @ElementCollection
    private List<String> items;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(nullable = false)
    private boolean redeemedLoyaltyPoints;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Constructors
    public Order() {}

    public Order(String customerName, List<String> items, BigDecimal totalAmount, boolean redeemedLoyaltyPoints, LocalDateTime createdAt) {
        this.customerName = customerName;
        this.items = items;
        this.totalAmount = totalAmount;
        this.redeemedLoyaltyPoints = redeemedLoyaltyPoints;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public boolean isRedeemedLoyaltyPoints() {
        return redeemedLoyaltyPoints;
    }

    public void setRedeemedLoyaltyPoints(boolean redeemedLoyaltyPoints) {
        this.redeemedLoyaltyPoints = redeemedLoyaltyPoints;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}