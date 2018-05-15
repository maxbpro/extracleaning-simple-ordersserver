package com.extracleaning.simpleweb.landing.repositories;


import com.extracleaning.simpleweb.landing.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

    User findByUsername(String username);

    User findByEmail(String email);


}
