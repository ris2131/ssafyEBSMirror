package com.ssafyebs.customerback.global.schedule;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Calendar;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafyebs.customerback.domain.pay.entity.Pay;
import com.ssafyebs.customerback.domain.pay.service.PayService;
import com.ssafyebs.customerback.domain.subscribe.entity.Subscription;
import com.ssafyebs.customerback.domain.subscribe.service.FederatedPricingService;
import com.ssafyebs.customerback.domain.subscribe.service.SubscriptionService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Scheduler {

	private final SubscriptionService subscriptionService;
	private final FederatedPricingService FederatedPricingService;
	private final PayService payService;

	// 매일 12시에 조회
	@Scheduled(cron = "0 0 0 * * *")
//	@Scheduled(cron = "0 * * * * *")
	public void renewSubscribe() throws IOException {
		for (Pay p : payService.getNewerList()) {
			String reqURL = "https://kapi.kakao.com/v1/payment/subscription";
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			conn.setRequestProperty("Authorization", "KakaoAK d08fb758ac87e7487a96eb2cf1bd4b5e");
			conn.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			String sb = "cid=" + p.getPayCid() +
					"&sid=" + p.getPaySid() +
					"&partner_order_id=" + p.getPayPartnerOrderId() +
					"&partner_user_id=" + p.getPayPartnerUserId() +
					"&quantity=1" +
					"&total_amount=" + p.getPayTotalAmount() +
					"&tax_free_amount=" + p.getPayTaxFreeAmount();

			bw.write(sb);
			bw.flush();

			int responseCode = conn.getResponseCode();

			if (responseCode == 200) {

				BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				String line;
				String result = "";

				while ((line = br.readLine()) != null) {
					result += line;
				}

				JsonParser parser = new JsonParser();
				JsonElement element = parser.parse(result);

				Long seq = Long.valueOf(element.getAsJsonObject().get("partner_order_id").getAsString().substring(5));

				Subscription temp = p.getSubscription();
				temp.setSubscriptionRenew(false);
				subscriptionService.makeSubscription(temp);
				
				Subscription s = new Subscription();
				s.setFederatedPricing(p.getSubscription().getFederatedPricing());
				s.setMember(p.getSubscription().getMember());
				s.setSubscriptionLeft(p.getSubscription().getFederatedPricing().getPricingNumber());
				Calendar cal = (Calendar)p.getSubscription().getSubscriptionExpiration().clone();
				cal.add(Calendar.MONTH, p.getSubscription().getFederatedPricing().getPricingMonth().intValue());
				s.setSubscriptionExpiration(cal);
				s.setSubscriptionRenew(true);

				subscriptionService.makeSubscription(s);
				p.setSubscription(s);

				payService.save(p);

			}
		}
	}
}
