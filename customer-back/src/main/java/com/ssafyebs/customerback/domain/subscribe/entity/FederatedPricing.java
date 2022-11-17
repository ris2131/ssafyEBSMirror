package com.ssafyebs.customerback.domain.subscribe.entity;

import javax.annotation.concurrent.Immutable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Immutable
@Table(name = "federated_pricings")
@Getter
public class FederatedPricing {
	@Id
	@Column(name="pricing_seq")
	private Long pricingSeq;
	
	@Column(name="business_seq")
	private Long businessSeq;
	
	@Column(name="hairshop_name")
	private String hairshopName;

	@Column(name="hairshop_photo")
	private String hairshopPhoto;
	
	@Column(name="pricing_number")
	private Long pricingNumber;
	
	@Column(name="pricing_month")
	private Long pricingMonth;
	
	@Column(name="pricing_price")
	private Long pricingPrice;
}
