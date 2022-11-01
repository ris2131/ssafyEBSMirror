package com.ssafyebs.customerback.domain.subscribe.service;

import java.util.List;

import com.ssafyebs.customerback.domain.subscribe.entity.Subscription;

public interface SubscriptionService {
	List<Subscription> findByMember_MemberUid(String uid);
	Subscription makeSubscription(Subscription subscription);
	Boolean findByMember_MemberUidAndFederatedSubscription_BusinessSeq(String uid, Long seq);
	List<Subscription> findTop1ByMember_MemberUidAndFederatedSubscription_BusinessSeqOrderBySubscriptionSeqDesc(String uid, Long seq);

}
