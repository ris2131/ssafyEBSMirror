package com.ssafyebs.customerback.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

import java.util.Date;

@Getter
public class MemberUpdateInfoRequestDto {

    @JsonProperty("member_nickname")
    private String memberNickname;

    @JsonProperty("member_address")
    private String memberAddress;


}
