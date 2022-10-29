package com.ssafyebs.businessbe.domain.business.dto.requestdto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafyebs.businessbe.domain.business.entity.Business;
import com.ssafyebs.businessbe.domain.business.service.BusinessCreationServiceImpl;
import com.ssafyebs.businessbe.global.util.CryptoUtil;
import lombok.Getter;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


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
    //sha-256 으로 dto 만들어질때 자동으로 encoding
    public void setPassword(String password) {
        this.password = CryptoUtil.Sha256.hash(password);
    }
}
