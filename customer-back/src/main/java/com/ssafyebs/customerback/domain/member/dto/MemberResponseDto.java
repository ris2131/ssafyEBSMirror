package com.ssafyebs.customerback.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafyebs.customerback.domain.member.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberResponseDto {

    @JsonProperty("memberNickname")
    private String memberNickname;

    @JsonProperty("memberAddress")
    private String memberAddress;

    public MemberResponseDto(Member entity){
        this.memberNickname = entity.getMemberNickname();
        this.memberAddress = entity.getMemberAddress();
    }
}
