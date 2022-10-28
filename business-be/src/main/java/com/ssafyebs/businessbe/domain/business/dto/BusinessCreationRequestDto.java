package com.ssafyebs.businessbe.domain.business.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class BusinessCreationRequestDto {
    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    @JsonProperty("name")
    private String name;

    @JsonProperty("owner")
    private String owner;

    @JsonProperty("phone")
    private String phone;

    @JsonProperty("registration")
    private String registration;

}
