package com.ssafyebs.customerback.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

import java.util.Date;

@Getter
public class MemberUpdateInfoRequestDto {
    private String nickname;
    @JsonProperty("birth_YMD")
    @JsonFormat(shape= JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd")
    private Date memberYMD;

//    public Member toEntity(){
//        return Member.builder()
//                .nickname(this.nickname)
//                .memberYMD(this.memberYMD)
//                .build();
//    }
}