package com.ssafyebs.businessbe.domain.business.entity;

import lombok.*;

import javax.persistence.*;

@Builder
@AllArgsConstructor//builder랑 왜 같이 넣어야하지?
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "businesses")
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "business_seq")
    private Long businessSeq;

    @Column(name = "business_email")
    private String email;

    @Column(name = "business_password")
    private String password;

    @Column(name = "business_owner")
    private String owner;

    @Column(name = "business_registration")
    private String registration;

    @Column(name = "business_refresh_token")
    private String refreshToken;

    public void updateRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }

}
