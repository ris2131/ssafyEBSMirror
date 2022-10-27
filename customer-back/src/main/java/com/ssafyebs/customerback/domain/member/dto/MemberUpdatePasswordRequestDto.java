package com.ssafyebs.customerback.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class MemberUpdatePasswordRequestDto {

    @JsonProperty("cur_password")
    private String curPassword;
    @JsonProperty("new_password")
    private String newPassword;


//    public Member toEntity(){
//        return Member.builder()
//                .password(curPassword)
//                .build();
//    }
}
