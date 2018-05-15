package com.extracleaning.simpleweb.landing.controller;

import com.extracleaning.simpleweb.landing.config.exceptions.EntityNotFoundException;
import com.extracleaning.simpleweb.landing.domain.User;
import com.extracleaning.simpleweb.landing.repositories.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    private static final String SECRET = "secretkey";
    private static final String TOKEN_PREFIX = "Bearer";

    @Autowired
    private UserRepository usersRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @PostConstruct
    private void init() {

        saveUser1();
        saveUser2();
        saveUser3();

    }

    private void saveUser1(){
        User user = new User();
        user.setUsername("sergei");
        user.setEmail("sergei@xcleaner.ru");
        user.setFirstName("Сергей");
        user.setLastName("Жигулин");
        user.setPassword(encoder.encode("Jd834Jso"));
        user.setEnabled(true);

        List<String> roles = new ArrayList<>();
        roles.add("ADMIN");
        user.setRoles(roles);
        usersRepository.save(user);
    }

    private void saveUser2(){
        User user = new User();
        user.setUsername("nastya");
        user.setEmail("nastya@xcleaner.ru");
        user.setFirstName("Настя");
        user.setLastName("Буянова");
        user.setPassword(encoder.encode("Jd834Jso"));
        user.setEnabled(true);

        List<String> roles = new ArrayList<>();
        roles.add("ADMIN");
        user.setRoles(roles);
        usersRepository.save(user);
    }

    private void saveUser3(){
        User user = new User();
        user.setUsername("maxb2009");
        user.setEmail("maxb2009@xcleaner.ru");
        user.setFirstName("Макс");
        user.setLastName("Буянов");
        user.setPassword(encoder.encode("Jd834Jso"));
        user.setEnabled(true);

        List<String> roles = new ArrayList<>();
        roles.add("ADMIN");
        user.setRoles(roles);
        usersRepository.save(user);
    }

    @RequestMapping("/user")
    public User user(Principal principal) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedUsername = auth.getName();
        return usersRepository.findByUsername(loggedUsername);
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> login(@RequestParam String username,
                                                     @RequestParam String password) throws EntityNotFoundException {

        User user = usersRepository.findByUsername(username);

        if (user == null) {
            user = usersRepository.findByEmail(username);
            if (user == null) {
                throw new EntityNotFoundException(User.class);
            }
        }

        return getResponseEntry(user, user.getUsername(), password);
    }

    private ResponseEntity<Map<String, Object>> getResponseEntry(User appUser, String username, String rawPassword) throws EntityNotFoundException{

        Map<String, Object> tokenMap = new HashMap<>();

        if (appUser != null && encoder.matches(rawPassword, appUser.getPassword())) {
            String token = Jwts.builder()
                    .setSubject(username)
                    .claim("roles", appUser.getRoles()).setIssuedAt(new Date())
                    .signWith(SignatureAlgorithm.HS256, SECRET)
                    .compact();

            tokenMap.put("token", token);
            tokenMap.put("user", appUser);
            return new ResponseEntity<>(tokenMap, HttpStatus.OK);
        }else {
            throw new EntityNotFoundException(User.class);
        }
    }

    @RequestMapping("/users")
    private Page<User> users(@RequestParam("page") int page, @RequestParam("size") int size){
        return usersRepository.findAll(new PageRequest(page, size));
    }
}
