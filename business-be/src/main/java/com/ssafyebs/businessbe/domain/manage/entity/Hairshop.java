package com.ssafyebs.businessbe.domain.manage.entity;

import com.ssafyebs.businessbe.domain.business.entity.Business;
import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "hairshops")
public class Hairshop {
    @Id
    @Column(name = "business_seq")
    private Long businessSeq;

    @OneToOne
    @MapsId
    @JoinColumn(name = "business_seq")
    private Business business;

    @Column(name = "business_name")
    private Long name;

    @Column(name = "business_phone")
    private Long phone;

    @Column(name = "business_address")
    private Long address;

    @Column(name = "business_photo")
    private Long photo;

    @Column(name = "business_notice")
    private Long notice;

    @Column(name = "business_description")
    private Long description;

    @Column(name = "business_homepage")
    private Long homepage;

    @Column(name = "business_visible_flag")
    private Long isVisible;
}
