package com.ssafyebs.customerback.domain.pay.repository;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafyebs.customerback.domain.pay.entity.Pay;

public interface PayRepository extends JpaRepository<Pay, Long>{
	List<Pay> findAllBySubscription_SubscriptionExpirationBetween(Calendar start, Calendar end);
	Optional<Pay> findBySubscription_FederatedPricing_BusinessSeqAndSubscription_Member_MemberUid(Long seq, String uid);
}
