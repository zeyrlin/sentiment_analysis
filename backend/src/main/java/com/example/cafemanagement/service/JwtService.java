package com.example.cafemanagement.service;

import org.springframework.beans.factory.annotation.Value;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtService {

    @Value("${JWT_SECRET_KEY}")
    private String jwtSecretKey;

    public String generateToken() {
        return Jwts.builder()
                .setSubject("user")
                .signWith(SignatureAlgorithm.HS256, jwtSecretKey)
                .compact();
    }
}