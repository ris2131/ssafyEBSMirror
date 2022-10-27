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

    @Column(name = "hairshop_name")
    private Long name;

    @Column(name = "hairshop_phone")
    private Long phone;

    @Column(name = "hairshop_address")
    private Long address;

    @Column(name = "hairshop_photo")
    private Long photo;

    @Column(name = "hairshop_notice")
    private Long notice;

    @Column(name = "hairshop_description")
    private Long description;

    @Column(name = "hairshop_homepage")
    private Long homepage;

    @Column(name = "hairshop_visible_flag")
    private Long isVisible;
}
