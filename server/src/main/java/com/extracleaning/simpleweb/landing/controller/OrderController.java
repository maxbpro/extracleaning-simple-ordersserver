package com.extracleaning.simpleweb.landing.controller;


import com.extracleaning.simpleweb.landing.domain.*;
import com.extracleaning.simpleweb.landing.repositories.OrderRepository;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    private MessageSource messages;

    @Autowired
    private Environment env;

    @Autowired
    private JavaMailSender mailSender;


//    @PostConstruct
//    private void init() {
//
//        orderRepository.deleteAll();
//
//        for(int i =0 ; i < 33; i++){
//
//            Order order = new Order();
//            order.setAddress("Красная 145");
//            order.setPhone("+7 928 4441873");
//            order.setDate(LocalDateTime.now());
//
//            ArmchairGroup armchairGroup = new ArmchairGroup();
//            armchairGroup.setMaterial(new Property("material 1"));
//            armchairGroup.setNumber(new Property("3"));
//            armchairGroup.setSlider(true);
//            order.setArmchairGroup(armchairGroup);
//
//            MattressGroup mattressGroup = new MattressGroup();
//            mattressGroup.setSize(new Property("size 1"));
//            mattressGroup.setSides(new Property("2"));
//            mattressGroup.setNumber(new Property("3"));
//            mattressGroup.setSlider(true);
//            order.setMattressGroup(mattressGroup);
//
//            CoverGroup coverGroup = new CoverGroup();
//            coverGroup.setMaterial(new Property("material 1"));
//            coverGroup.setNumber(new Property("3"));
//            coverGroup.setHeight(new Property("2"));
//            coverGroup.setType(new Property("type 1"));
//            coverGroup.setWidth(new Property("2"));
//            coverGroup.setSlider(true);
//            order.setCoverGroup(coverGroup);
//
//            CouchGroup couchGroup = new CouchGroup();
//            couchGroup.setMaterial(new Property("material 1"));
//            couchGroup.setNumber(new Property("3"));
//            couchGroup.setSize(new Property("size 1"));
//            couchGroup.setMoves(new Property("yes"));
//            couchGroup.setSlider(true);
//            order.setCouchGroup(couchGroup);
//
//            ChairGroup chairGroup = new ChairGroup();
//            chairGroup.setMaterial(new Property("material 1"));
//            chairGroup.setNumber(new Property("3"));
//            chairGroup.setSlider(true);
//            chairGroup.setType(new Property("type 1"));
//            order.setChairGroup(chairGroup);
//
//            orderRepository.save(order);
//        }
//
//
//
//    }

    @RequestMapping(value = "/standard", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void create(@RequestBody Order order) {
        orderRepository.save(order);
        notifyCleanerWithMailGun();
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
        notifyCleanerWithMailGun();
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

        String recipientAddress1 = "maxbpro2009@gmail.com";
        String recipientAddress2 = "maxb2009@xcleaner.ru";
        String recipientAddress3 = "nastya@xcleaner.ru";
        String recipientAddress4 = "sergei@xcleaner.ru";
        String subject = "Опа, заказа прилетел";

        String message = "Новый заказ, проверь админку";

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(new String[]{recipientAddress1, recipientAddress2, recipientAddress3, recipientAddress4});
        email.setSubject(subject);
        email.setFrom(env.getProperty("support.email"));

        email.setText(message);

        try{
            mailSender.send(email);
        }catch (Exception ex){
            ex.printStackTrace();
            throw ex;
        }

        notifyCleanerWithMailGun();
    }

    private void notifyCleanerWithMailGun(){

        String DOMAIN_NAME = "xcleaner.ru";
        String API_KEY = "key-652c4d8005cb3a9bab7de3956af9d461";

        try{

            HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + DOMAIN_NAME + "/messages")
                    .basicAuth("api", API_KEY)
                    .queryString("from", "maxb2009@xcleaner.ru")
                    .queryString("to", "maxbpro2009@gmail.com")
                    .queryString("subject", "Опа, заказа прилетел")
                    .queryString("text", "Новый заказ, проверь админку")
                    .asJson();
            JsonNode jsonNode = request.getBody();

        }catch (Exception ex){
            ex.printStackTrace();
        }


    }

    @RequestMapping()
    private Page<Order> orders(@RequestParam("page") int page, @RequestParam("size") int size){
        return orderRepository.findAll(new PageRequest(page, size));
    }

    @RequestMapping("/{id}")
    private Order getOrder(@PathVariable String id){
        return orderRepository.findOne(id);
    }
}
