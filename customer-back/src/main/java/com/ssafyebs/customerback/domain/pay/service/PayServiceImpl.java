package com.ssafyebs.customerback.domain.pay.service;

import org.springframework.stereotype.Service;

import com.ssafyebs.customerback.domain.pay.repository.PayRepository;
import com.ssafyebs.customerback.domain.subscribe.repository.SubscriptionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PayServiceImpl implements PayService{
	private final PayRepository payRepository;
	private final SubscriptionRepository subscriptionRepository;
}
