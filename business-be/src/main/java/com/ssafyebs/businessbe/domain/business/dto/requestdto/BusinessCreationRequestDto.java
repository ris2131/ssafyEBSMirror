package com.ssafyebs.businessbe.domain.business.dto.requestdto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafyebs.businessbe.domain.business.entity.Business;
import com.ssafyebs.businessbe.global.util.CryptoUtil;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class BusinessCreationRequestDto {
    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    @JsonProperty("owner")
    private String owner;

    @JsonProperty("registration")
    private String registration;

    public Business toEntity(){
        return Business.builder()
                .email(this.email)
                .password(this.password)
                .owner(this.owner)
                .registration(this.registration)
                .build();
    }
}
