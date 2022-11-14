package com.ssafyebs.customerback.domain.pay.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafyebs.customerback.domain.pay.entity.Pay;
import com.ssafyebs.customerback.domain.pay.repository.PayRepository;
import com.ssafyebs.customerback.domain.subscribe.repository.SubscriptionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PayServiceImpl implements PayService{
	private final PayRepository payRepository;
	private final SubscriptionRepository subscriptionRepository;
	@Override
	public Pay save(Pay p) {
		return payRepository.save(p);
	}
}
