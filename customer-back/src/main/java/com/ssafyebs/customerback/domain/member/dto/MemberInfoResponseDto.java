package com.ssafyebs.customerback.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafyebs.customerback.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
public class MemberInfoResponseDto {

    private String nickname;
    private String uid;
    private char logintype;
    private String address;

    @Builder
    public MemberInfoResponseDto(Member entity){
        this.nickname = entity.getMemberNickname();
        this.uid = entity.getMemberUid();
        this.logintype = entity.getMemberLogintype();
        this.address = entity.getMemberAddress();
    }



}
