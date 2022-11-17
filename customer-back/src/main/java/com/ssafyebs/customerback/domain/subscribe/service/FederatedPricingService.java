package com.ssafyebs.customerback.domain.subscribe.service;

import java.util.List;
import java.util.Optional;

import com.ssafyebs.customerback.domain.subscribe.entity.FederatedPricing;


public interface FederatedPricingService {
	Optional<FederatedPricing> findByPricingSeq(Long seq);
	List<FederatedPricing> findByBusinessSeq(Long seq);
}
