package com.extracleaning.simpleweb.landing.controller;


import com.extracleaning.simpleweb.landing.domain.Order;
import com.extracleaning.simpleweb.landing.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void create(@RequestBody Order order) {
        orderRepository.save(order);
    }

    @RequestMapping(value = "/{id}")
    public Order read(@PathVariable String id) {
        return orderRepository.findOne(id);
    }

    @RequestMapping(value = "/all")
    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void update(@RequestBody Order order) {
        orderRepository.save(order);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable String id) {
        orderRepository.delete(id);
    }
}
