package com.ssafyebs.customerback.domain.subscribe.dto;

import java.util.Calendar;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubscriptionResponseDto {
	
	private String hairshopName;
	
	private Calendar subscriptionStart;
	
	private Calendar subscriptionExpiration;
	
	private Long pricingNumber;
	
	private Long subscriptionLeft;
	
	private Long businessSeq;
	
	private Boolean subscriptionRenew;

	private String hairshopPhoto;
}
