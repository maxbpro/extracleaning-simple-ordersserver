package com.extracleaning.simpleweb.landing.controller;


import com.extracleaning.simpleweb.landing.domain.*;
import com.extracleaning.simpleweb.landing.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void create(@RequestBody Order order) {
        orderRepository.save(order);
        notifyCleaner();
    }

    @RequestMapping(value = "/simple", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void create(@RequestBody SimpleOrder simpleOrder) {

        Order order = new Order();
        order.setAddress(simpleOrder.getAddress());
        order.setPhone(simpleOrder.getPhone());

        if(simpleOrder.getDate() != null && simpleOrder.getTime() != null){

            LocalDateTime date = simpleOrder.getDate();
            LocalDateTime time = simpleOrder.getTime();

            LocalDateTime selectedMoment = LocalDateTime.of(date.toLocalDate(), time.toLocalTime());

            order.setDate(selectedMoment);
        }

        if(simpleOrder.isArmchair()){
            ArmchairGroup group = new ArmchairGroup();
            group.setSlider(true);
            order.setArmchairGroup(group);
        }

        if(simpleOrder.isChair()){
            ChairGroup group = new ChairGroup();
            group.setSlider(true);
            order.setChairGroup(group);
        }

        if(simpleOrder.isCouch()){
            CouchGroup group = new CouchGroup();
            group.setSlider(true);
            order.setCouchGroup(group);
        }

        if(simpleOrder.isCover()){
            CoverGroup group = new CoverGroup();
            group.setSlider(true);
            order.setCoverGroup(group);
        }

        if(simpleOrder.isMattress()){
            MattressGroup group = new MattressGroup();
            group.setSlider(true);
            order.setMattressGroup(group);
        }

        orderRepository.save(order);
        notifyCleaner();
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

    private void notifyCleaner(){

    }
}
