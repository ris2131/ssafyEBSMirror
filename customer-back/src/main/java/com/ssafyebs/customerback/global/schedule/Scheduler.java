package com.ssafyebs.customerback.global.schedule;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ssafyebs.customerback.domain.subscribe.service.SubscriptionService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Scheduler {
	
	private final SubscriptionService subscriptionService;
	
	//매일 12시에 조회
	@Scheduled(cron = "0 0 3 1 * *")
	public void renewSubscribe() throws InterruptedException{
		System.out.println("every 1 minutes");
	}
}
