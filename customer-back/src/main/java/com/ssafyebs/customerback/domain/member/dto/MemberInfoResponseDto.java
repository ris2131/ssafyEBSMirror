package com.ssafyebs.customerback.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafyebs.customerback.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
public class MemberInfoResponseDto {

    private String memberNickname;
    private String memberUid;
    private char memberLogintype;
    private String memberAddress;

    @Builder
    public MemberInfoResponseDto(Member entity){
        this.memberNickname = entity.getMemberNickname();
        this.memberUid = entity.getMemberUid();
        this.memberLogintype = entity.getMemberLogintype();
        this.memberAddress = entity.getMemberAddress();
    }



}
