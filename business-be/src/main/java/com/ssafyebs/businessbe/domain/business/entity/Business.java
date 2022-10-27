package com.ssafyebs.businessbe.domain.business.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "businesses")
public class Business {
    @Id
    @Column(name = "business_seq")
    private Long businessSeq;

    @Column(name = "business_email")
    private Long email;

    @Column(name = "business_password")
    private String password;

    @Column(name = "business_owner")
    private String owner;

    @Column(name = "business_registration")
    private String registration;

    @Column(name = "business_refresh_token")
    private String refreshToken;
}
