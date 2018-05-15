package com.extracleaning.simpleweb.landing.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }


    @Override
    public void configure(WebSecurity web) throws Exception {

        web.ignoring()
                .antMatchers(HttpMethod.OPTIONS,"/**")
                .antMatchers("/", "/api/v1/authenticate", "/api/v1/orders/standard", "/api/v1/orders/simple",
                         "/api/v1/reset", "/favicon.ico", "/index.html");
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {

             http
                // adding JWT filter
                .addFilterBefore(new JWTFilter(), UsernamePasswordAuthenticationFilter.class)
                // enabling the basic authentication
                .httpBasic()
                .and()
                .logout().logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
                .and()
                // configuring the session as state less. Which means there is
                // no session in the server
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // disabling the CSRF - Cross Site Request Forgery
                .csrf().disable()
                 .authorizeRequests()
                     .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                     .anyRequest().authenticated();

        //http.csrf().disable();

    }


}
