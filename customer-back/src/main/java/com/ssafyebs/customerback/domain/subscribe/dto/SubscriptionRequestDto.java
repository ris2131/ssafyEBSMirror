package com.ssafyebs.customerback.domain.subscribe.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubscriptionRequestDto {
	private String cid;
	private String tid;
	private String partner_order_id;
	private String partner_user_id;
	private String pg_token;
}
