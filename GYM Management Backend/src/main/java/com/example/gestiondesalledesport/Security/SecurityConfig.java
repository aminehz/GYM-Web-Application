package com.example.gestiondesalledesport.Security;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {



 userDetailsServiceImplementation userDetailsServiceImplementation;

@Bean
SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
    httpSecurity.formLogin(form -> form.successHandler((request, response, authentication) -> {
        response.setStatus(HttpStatus.OK.value());
        response.getWriter().println("success");
    }).failureHandler((request, response, exception) -> {
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
    }).permitAll());
    httpSecurity.authorizeHttpRequests(authorize -> authorize.requestMatchers("/admin/").hasAuthority("ADMIN"));
    httpSecurity.authorizeHttpRequests(authorize -> authorize.requestMatchers("/user/").hasAuthority("USER"));
    httpSecurity.authorizeHttpRequests(authorize -> authorize.requestMatchers("/photos/**").permitAll());
    httpSecurity.exceptionHandling(exception -> exception.accessDeniedPage("/errorPage"));
    httpSecurity.csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.disable()).authorizeHttpRequests(authorize -> authorize.anyRequest().authenticated());
    httpSecurity.userDetailsService(userDetailsServiceImplementation);
    httpSecurity.httpBasic(Customizer.withDefaults());
    return httpSecurity.build();
}
}
