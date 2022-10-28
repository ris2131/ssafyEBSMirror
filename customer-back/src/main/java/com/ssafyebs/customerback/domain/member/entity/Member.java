package com.ssafyebs.customerback.domain.member.entity;


import com.ssafyebs.customerback.domain.member.dto.MemberUpdateInfoRequestDto;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Table(name = "members")
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @Column(name="member_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberSeq;

    @Column(name="member_logintype", nullable = false)
    private char memberLogintype;

    @Column(name="member_uid" , nullable = false)
    private String memberUid;

    @Column(name="member_nickname",  nullable = false)
    private String memberNickname;

    @Column(name="member_address",  nullable = false)
    private String memberAddress;

    @Column(name="member_token",  nullable = false)
    private String memberToken;

    public void updateRefreshToken(String refreshToken){
        this.memberToken = refreshToken;
    }
    @Builder
    public Member(Long memberSeq, char memberLogintype, String memberUid, String memberNickname, String memberAddress, String refreshToken){
        this.memberSeq = memberSeq;
        this.memberLogintype = memberLogintype;
        this.memberUid = memberUid;
        this.memberNickname=memberNickname;
        this.memberAddress=memberAddress;
        this.memberToken=refreshToken;

    }
    public void updateInfo(MemberUpdateInfoRequestDto memberUpdateInfoRequestDto){
        this.memberNickname = memberUpdateInfoRequestDto.getNickname();
        this.memberAddress= memberUpdateInfoRequestDto.getAddress();
    }
//    public void updatePassword(MemberUpdatePasswordRequestDto memberUpdatePasswordRequestDto){
//        //this.password = memberUpdatePasswordRequestDto.getCurPassword();
//        this.password= memberUpdatePasswordRequestDto.getNewPassword();
//    }
//    public void updatePicturePath(String picturePath){
//        this.picturePath=picturePath;
//    }


}
