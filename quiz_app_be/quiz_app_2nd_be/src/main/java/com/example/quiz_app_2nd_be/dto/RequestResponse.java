package com.example.quiz_app_2nd_be.dto;

import com.example.quiz_app_2nd_be.entity.OurUsers;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class RequestResponse {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String name;
    private String role;
    private String city;
    private String email;
    private String password;
    private OurUsers ourUsers;
    private List<OurUsers> ourUsersList;

}
