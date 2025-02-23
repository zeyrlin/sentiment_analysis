package com.example.cafemanagement.repository;

import com.example.cafemanagement.entity.Table;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface TableRepository extends JpaRepository<Table, Long> {
    Page<Table> findAll(Pageable pageable);
}