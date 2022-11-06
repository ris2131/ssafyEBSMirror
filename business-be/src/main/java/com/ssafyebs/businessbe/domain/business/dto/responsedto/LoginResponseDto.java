package com.ssafyebs.businessbe.domain.business.dto.responsedto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Setter;

@Setter
public class LoginResponseDto {
    @JsonProperty("hairshop_visible")
    boolean hairShopVisible;
}
