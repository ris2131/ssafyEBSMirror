package com.ssafyebs.customerback.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafyebs.customerback.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter

public class MemberResponseDto {

    @JsonProperty("member_uid")
    private String memberUid;

    @JsonProperty("member_logintype")
    private char memberLogintype;
    @JsonProperty("member_nickname")
    private String memberNickname;

    @JsonProperty("member_address")
    private String memberAddress;


    @Builder
    public MemberResponseDto(Member entity){
        this.memberNickname = entity.getMemberNickname();
        this.memberUid = entity.getMemberUid();
        this.memberLogintype = entity.getMemberLogintype();
        this.memberAddress = entity.getMemberAddress();
    }
}
