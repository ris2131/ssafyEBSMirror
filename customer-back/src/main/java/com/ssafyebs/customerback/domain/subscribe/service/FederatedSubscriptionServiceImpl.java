package com.ssafyebs.customerback.domain.subscribe.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafyebs.customerback.domain.subscribe.entity.FederatedSubscription;
import com.ssafyebs.customerback.domain.subscribe.repository.FederatedSubscriptionRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FederatedSubscriptionServiceImpl implements FederatedSubscriptionService{
	
	private final FederatedSubscriptionRepository federatedSubscriptionRepository;

	@Override
	public Optional<FederatedSubscription> findByPricingSeq(Long seq) {
		return federatedSubscriptionRepository.findByPricingSeq(seq);
	}
	
	
}
