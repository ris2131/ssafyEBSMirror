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
@Table(name = "pricings")
public class Pricing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pricing_seq")
    private Long pricingSeq;

    @ManyToOne
    @JoinColumn(name="business_seq")
    private Business business;

    @Column(name = "pricing_price")
    private int price;

    @Column(name = "pricing_month")
    private int month;

    @Column(name = "pricing_number")
    private int number;
}