package com.ssafyebs.customerback.domain.subscribe.repository;

import java.util.Calendar;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafyebs.customerback.domain.subscribe.entity.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long>{
	List<Subscription> findByMember_MemberUid(String uid);
	List<Subscription> findByMember_MemberUidOrderBySubscriptionSeqDesc(String uid);
	List<Subscription> findByMember_MemberUidAndFederatedSubscription_BusinessSeq(String uid, Long seq);
	List<Subscription> findTop1ByMember_MemberUidAndFederatedSubscription_BusinessSeqOrderBySubscriptionSeqDesc(String uid, Long seq);
	List<Subscription> findByMember_MemberUidAndSubscriptionExpirationGreaterThanAndSubscriptionLeftGreaterThan(String uid, Calendar date, Long left);
	List<Subscription> findByMember_MemberUidAndSubscriptionExpirationGreaterThanAndSubscriptionLeftGreaterThanAndFederatedSubscription_BusinessSeqOrderBySubscriptionSeqDesc(String uid, Calendar date, Long left, Long seq);
	List<Subscription> findByMember_MemberUidAndSubscriptionExpirationGreaterThanAndSubscriptionLeftGreaterThanOrderBySubscriptionSeqDesc(String uid, Calendar date, Long left);

}
