package com.ssafyebs.customerback.domain.member.entity;


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


//    @Builder
//    public Member(Long memberSequence, String nickname, String email, Date memberYMD, String provider, String picturePath, String password, String refreshToken){
//        this.memberSequence = memberSequence;
//        this.nickname = nickname;
//        this.email = email;
//        this.memberYMD=memberYMD;
//        this.provider = provider;
//        this.picturePath=picturePath;
//        this.password=password;
//        this.refreshToken = refreshToken;
//    }
//    public void updateInfo(MemberUpdateInfoRequestDto memberUpdateInfoRequestDto){
//        this.nickname = memberUpdateInfoRequestDto.getNickname();
//        this.memberYMD= memberUpdateInfoRequestDto.getMemberYMD();
//    }
//    public void updatePassword(MemberUpdatePasswordRequestDto memberUpdatePasswordRequestDto){
//        //this.password = memberUpdatePasswordRequestDto.getCurPassword();
//        this.password= memberUpdatePasswordRequestDto.getNewPassword();
//    }
//    public void updatePicturePath(String picturePath){
//        this.picturePath=picturePath;
//    }
//    public void updateRefreshToken(String refreshToken){
//        this.refreshToken = refreshToken;
//    }

}
