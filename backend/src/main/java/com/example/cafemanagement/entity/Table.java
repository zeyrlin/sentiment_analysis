package com.example.cafemanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Table {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String status; // "AVAILABLE", "RESERVED", "OCCUPIED"

    @Column(nullable = false)
    private LocalDateTime reservationTime;

    @Column(nullable = true)
    private String reservedBy;

    // Constructors
    public Table() {}

    public Table(String status, LocalDateTime reservationTime, String reservedBy) {
        this.status = status;
        this.reservationTime = reservationTime;
        this.reservedBy = reservedBy;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getReservationTime() {
        return reservationTime;
    }

    public void setReservationTime(LocalDateTime reservationTime) {
        this.reservationTime = reservationTime;
    }

    public String getReservedBy() {
        return reservedBy;
    }

    public void setReservedBy(String reservedBy) {
        this.reservedBy = reservedBy;
    }
}