package com.ssafyebs.customerback.domain.subscribe.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafyebs.customerback.domain.subscribe.entity.Subscription;
import com.ssafyebs.customerback.domain.subscribe.repository.SubscriptionRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService{

	private final SubscriptionRepository subscriptionRepository;
	
	@Override
	public List<Subscription> findByMember_MemberUid(String uid) {
		return subscriptionRepository.findByMember_MemberUid(uid);
	}

	@Override
	public Subscription makeSubscription(Subscription subscription) {
		return subscriptionRepository.save(subscription);
	}

	@Override
	public Boolean findByMember_MemberUidAndFederatedSubscription_PricingSeq(String uid, Long seq) {
		List<Subscription> list = subscriptionRepository.findByMember_MemberUidAndFederatedSubscription_PricingSeq(uid, seq);
		
		for(Subscription s : list) {
			//for문 안에서 중간에 유효기간 안지난거 있는지 체크해봐야 함. 있는경우 return true;
			return true;
		}
		
		return false;
	}

}
