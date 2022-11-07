package com.ssafyebs.customerback.domain.subscribe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafyebs.customerback.domain.subscribe.entity.FederatedSubscription;

public interface FederatedSubscriptionRepository extends JpaRepository<FederatedSubscription, Long>{
	Optional<FederatedSubscription> findByPricingSeq(Long seq);
	List<FederatedSubscription> findByBusinessSeq(Long seq);
}
