package com.ssafyebs.customerback.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class MemberGoogleRequestDto {
    @JsonProperty("id_token")
    private String idToken;

    @JsonProperty("memberLoginType")
    private char memberLoginType;

    @JsonProperty("memberNickname")
    private String memberNickname;

    @JsonProperty("memberAddress")
    private String memberAddress;

}
