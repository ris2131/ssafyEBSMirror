package com.ssafyebs.customerback.domain.subscribe.service;

import java.util.Optional;

import com.ssafyebs.customerback.domain.subscribe.entity.FederatedSubscription;


public interface FederatedSubscriptionService {
	Optional<FederatedSubscription> findByPricingSeq(Long seq);
}
