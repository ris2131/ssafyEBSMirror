package com.ssafyebs.customerback.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GoogleLoginRequestDto {
    @JsonProperty("accessToken")
    private String accessToken;

    @JsonProperty("loginType")
    private String loginType;
}
