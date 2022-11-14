package com.ssafyebs.customerback.domain.pay.service;

import java.util.Calendar;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafyebs.customerback.domain.pay.entity.Pay;
import com.ssafyebs.customerback.domain.pay.repository.PayRepository;
import com.ssafyebs.customerback.domain.subscribe.repository.SubscriptionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PayServiceImpl implements PayService{
	private final PayRepository payRepository;
	private final SubscriptionRepository subscriptionRepository;
	@Override
	public Pay save(Pay p) {
		return payRepository.save(p);
	}
	@Override
	public List<Pay> getNewerList() {
		Calendar cal = Calendar.getInstance();
		Calendar start = Calendar.getInstance();
		Calendar end = Calendar.getInstance();
		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH);
		int startdate = cal.getActualMinimum(Calendar.DAY_OF_MONTH);
		int enddate = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
		
		start.set(Calendar.YEAR, year);
		start.set(Calendar.MONTH, month);
		start.set(Calendar.DAY_OF_MONTH, startdate);
		start.set(Calendar.HOUR_OF_DAY, 0);
		start.set(Calendar.MINUTE, 0);
		start.set(Calendar.SECOND, 0);
		
		end.set(Calendar.YEAR, year);
		end.set(Calendar.MONTH, month);
		end.set(Calendar.DAY_OF_MONTH, enddate);
		end.set(Calendar.HOUR_OF_DAY, 23);
		end.set(Calendar.MINUTE, 59);
		end.set(Calendar.SECOND, 59);
		return payRepository.findAllBySubscription_SubscriptionExpirationBetween(start, end);
	}
}
