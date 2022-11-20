package com.ssafyebs.customerback.domain.subscribe.service;

import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

import javax.transaction.Transactional;

import com.ssafyebs.customerback.domain.subscribe.entity.FederatedPricing;
import org.springframework.stereotype.Service;

import com.ssafyebs.customerback.domain.subscribe.dto.SubscriptionResponseDto;
import com.ssafyebs.customerback.domain.subscribe.entity.Subscription;
import com.ssafyebs.customerback.domain.subscribe.repository.SubscriptionRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    @Override
    public List<SubscriptionResponseDto> findByMember_MemberUid(String uid) {
        List<Subscription> sList = subscriptionRepository.findByMember_MemberUidOrderBySubscriptionRenewDescSubscriptionSeqDesc(uid);
        return createDtoList(sList, new LinkedList<>());
    }

    @Override
    public Subscription makeSubscription(Subscription subscription) {
        return subscriptionRepository.save(subscription);
    }

    @Override
    public Boolean findByMember_MemberUidAndFederatedPricing_BusinessSeq(String uid, Long seq) {
        List<Subscription> list = subscriptionRepository.findByMember_MemberUidAndSubscriptionExpirationGreaterThanAndSubscriptionLeftGreaterThanAndFederatedPricing_BusinessSeqOrderBySubscriptionSeqDesc(uid, Calendar.getInstance(), (long) 0, seq);
        return list.size() > 0;
    }

    @Override
    public List<Subscription> findTop1ByMember_MemberUidAndFederatedPricing_BusinessSeqOrderBySubscriptionSeqDesc(String uid, Long seq) {
        return subscriptionRepository.findByMember_MemberUidAndSubscriptionExpirationGreaterThanAndSubscriptionLeftGreaterThanAndFederatedPricing_BusinessSeqOrderBySubscriptionSeqDesc(uid, Calendar.getInstance(), (long) 0, seq);
    }

    @Override
    public List<SubscriptionResponseDto> findByMember_MemberUidAndSubscriptionExpirationGreaterThanAndSubscriptionLeftGreaterThanOrderBySubscriptionSeqDesc(String uid) {
        List<Subscription> subscriptions = subscriptionRepository.findByMember_MemberUidAndSubscriptionExpirationGreaterThanAndSubscriptionLeftGreaterThanOrderBySubscriptionSeqDesc(uid, Calendar.getInstance(), (long) 0);
        return createDtoList(subscriptions, new LinkedList<>());
    }

    private List<SubscriptionResponseDto> createDtoList(List<Subscription> subscriptions, List<SubscriptionResponseDto> dtos) {
        for (Subscription subscription : subscriptions) {
            SubscriptionResponseDto dto = new SubscriptionResponseDto();
            FederatedPricing pricing = subscription.getFederatedPricing();

            dto.setHairshopName(pricing.getHairshopName());
            dto.setSubscriptionExpiration(subscription.getSubscriptionExpiration());
            dto.setPricingNumber(pricing.getPricingNumber());
            dto.setSubscriptionLeft(subscription.getSubscriptionLeft());
            dto.setBusinessSeq(pricing.getBusinessSeq());
            dto.setHairshopPhoto(pricing.getHairshopPhoto());
            Calendar calendar = (Calendar) subscription.getSubscriptionExpiration().clone();
            int value = pricing.getPricingMonth().intValue();
            calendar.add(Calendar.MONTH, -1 * value);
            dto.setSubscriptionStart(calendar);
            dto.setSubscriptionRenew(subscription.getSubscriptionRenew());
            dtos.add(dto);
        }
        return dtos;
    }
}
