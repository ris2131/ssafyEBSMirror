package com.ssafyebs.businessbe.domain.manage.entity;

import com.ssafyebs.businessbe.domain.business.entity.Business;
import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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
    private String name;

    @Column(name = "hairshop_phone")
    private String phone;

    @Column(name = "hairshop_address")
    private String address;

    @Column(name = "hairshop_photo")
    private String photo;

    @Column(name = "hairshop_notice")
    private String notice;

    @Column(name = "hairshop_description")
    private String description;

    @Column(name = "hairshop_homepage")
    private String homepage;

    @Column(name = "hairshop_visible_flag")
    private boolean isVisible;
}
