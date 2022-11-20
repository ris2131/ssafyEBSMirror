package com.ssafyebs.customerback.domain.subscribe.service;

import java.util.List;

import com.ssafyebs.customerback.domain.subscribe.dto.SubscriptionResponseDto;
import com.ssafyebs.customerback.domain.subscribe.entity.Subscription;

public interface SubscriptionService {
	List<SubscriptionResponseDto> findByMember_MemberUid(String uid);
	Subscription makeSubscription(Subscription subscription);
	Boolean findByMember_MemberUidAndFederatedPricing_BusinessSeq(String uid, Long seq);
	List<Subscription> findTop1ByMember_MemberUidAndFederatedPricing_BusinessSeqOrderBySubscriptionSeqDesc(String uid, Long seq);
	List<SubscriptionResponseDto> findByMember_MemberUidAndSubscriptionExpirationGreaterThanAndSubscriptionLeftGreaterThanOrderBySubscriptionSeqDesc(String uid);
}
