package com.extracleaning.simpleweb.landing.repositories;

import com.extracleaning.simpleweb.landing.domain.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
}
