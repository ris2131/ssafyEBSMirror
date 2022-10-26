package com.ssafyebs.customerback.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ieng.ieng.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
public class MemberInfoResponseDto {

    private String nickname;
    private String email;
    @JsonProperty("birth_YMD")
    @JsonFormat(shape= JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd")
    private Date memberYMD;
    private String provider;
    private String picturePath;

    @Builder
    public MemberInfoResponseDto(Member entity){
        this.nickname = entity.getNickname();
        this.email = entity.getEmail();
        this.memberYMD=entity.getMemberYMD();
        this.provider=entity.getProvider();
        this.picturePath= entity.getPicturePath();
    }
    public void updatePicturePath(String picturePath){
        this.picturePath= picturePath;
    }
}
