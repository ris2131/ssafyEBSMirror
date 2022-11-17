package com.ssafyebs.customerback.domain.subscribe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafyebs.customerback.domain.subscribe.entity.FederatedPricing;

public interface FederatedPricingRepository extends JpaRepository<FederatedPricing, Long>{
	Optional<FederatedPricing> findByPricingSeq(Long seq);
	List<FederatedPricing> findByBusinessSeq(Long seq);
}
