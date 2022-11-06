package com.ssafyebs.customerback.domain.subscribe.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafyebs.customerback.domain.subscribe.dto.SubscriptionResponseDto;
import com.ssafyebs.customerback.domain.subscribe.entity.Subscription;
import com.ssafyebs.customerback.domain.subscribe.repository.SubscriptionRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService{

	private final SubscriptionRepository subscriptionRepository;
	@Override
	public List<SubscriptionResponseDto> findByMember_MemberUid(String uid) {
		List<SubscriptionResponseDto> list = new ArrayList<SubscriptionResponseDto>();
		List<Subscription> slist = subscriptionRepository.findByMember_MemberUidOrderBySubscriptionSeqDesc(uid);
		
		for(Subscription s : slist) {
			SubscriptionResponseDto dto = new SubscriptionResponseDto();
			dto.setHairshopName(s.getFederatedSubscription().getHairshopName());
			dto.setSubscriptionExpiration(s.getSubscriptionExpiration());
			dto.setPricingNumber(s.getFederatedSubscription().getPricingNumber());
			dto.setSubscriptionLeft(s.getSubscriptionLeft());
			Calendar cal = (Calendar) s.getSubscriptionExpiration().clone();
			int value = s.getFederatedSubscription().getPricingMonth().intValue();
			cal.add(Calendar.MONTH, -1*value);
			dto.setSubscriptionStart(cal);
			list.add(dto);
		}
		return list;
	}

	@Override
	public Subscription makeSubscription(Subscription subscription) {
		return subscriptionRepository.save(subscription);
	}

	@Override
	public Boolean findByMember_MemberUidAndFederatedSubscription_BusinessSeq(String uid, Long seq) {
		List<Subscription> list = subscriptionRepository.findTop1ByMember_MemberUidAndFederatedSubscription_BusinessSeqOrderBySubscriptionSeqDesc(uid, seq);
		
		Calendar cal = Calendar.getInstance();
		for(Subscription s : list) {
			//for문 안에서 중간에 유효기간 안지난거 있는지 체크해봐야 함. 있는경우 return true;
			if(s.getSubscriptionExpiration().compareTo(cal)>=0 && s.getSubscriptionLeft() > 0)
				return true;
		}
		
		return false;
	}

	@Override
	public List<Subscription> findTop1ByMember_MemberUidAndFederatedSubscription_BusinessSeqOrderBySubscriptionSeqDesc(
			String uid, Long seq) {
		
		return subscriptionRepository.findTop1ByMember_MemberUidAndFederatedSubscription_BusinessSeqOrderBySubscriptionSeqDesc(uid, seq);
	}

}
