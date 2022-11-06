package com.ssafyebs.customerback.domain.subscribe.dto;

import java.util.Calendar;

import com.ssafyebs.customerback.domain.subscribe.entity.Subscription;

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
	
	
}
