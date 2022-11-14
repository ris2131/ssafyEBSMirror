package com.ssafyebs.customerback.domain.pay.repository;

import java.util.Calendar;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafyebs.customerback.domain.pay.entity.Pay;

public interface PayRepository extends JpaRepository<Pay, Long>{
	List<Pay> findAllBySubscription_SubscriptionExpirationBetween(Calendar start, Calendar end);
}
