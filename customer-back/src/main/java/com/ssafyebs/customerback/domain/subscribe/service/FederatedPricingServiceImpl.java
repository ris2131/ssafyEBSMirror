package com.ssafyebs.customerback.domain.subscribe.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafyebs.customerback.domain.subscribe.entity.FederatedPricing;
import com.ssafyebs.customerback.domain.subscribe.repository.FederatedPricingRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FederatedPricingServiceImpl implements FederatedPricingService{
	
	private final FederatedPricingRepository FederatedPricingRepository;

	@Override
	public Optional<FederatedPricing> findByPricingSeq(Long seq) {
		return FederatedPricingRepository.findByPricingSeq(seq);
	}

	@Override
	public List<FederatedPricing> findByBusinessSeq(Long seq) {
		// TODO Auto-generated method stub
		return FederatedPricingRepository.findByBusinessSeq(seq);
	}
	
	
}
