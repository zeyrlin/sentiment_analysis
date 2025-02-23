package com.example.cafemanagement.service;

import com.example.cafemanagement.entity.Order;
import com.example.cafemanagement.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List; // Add this import

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Page<Order> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    public void addOrder(Order order) {
        orderRepository.save(order);
    }

    public void updateOrder(Long id, Order updatedOrder) {
        Order existingOrder = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        existingOrder.setCustomerName(updatedOrder.getCustomerName());
        existingOrder.setItems(updatedOrder.getItems());
        existingOrder.setTotalAmount(updatedOrder.getTotalAmount());
        orderRepository.save(existingOrder);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}