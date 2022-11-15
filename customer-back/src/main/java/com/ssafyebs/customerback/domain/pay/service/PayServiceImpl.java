package com.ssafyebs.customerback.domain.pay.service;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafyebs.customerback.domain.pay.entity.Pay;
import com.ssafyebs.customerback.domain.pay.repository.PayRepository;
import com.ssafyebs.customerback.domain.subscribe.entity.Subscription;
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
		int date = cal.get(Calendar.DAY_OF_MONTH);
		
		start.set(Calendar.YEAR, year);
		start.set(Calendar.MONTH, month);
		start.set(Calendar.DAY_OF_MONTH, date);
		start.set(Calendar.HOUR_OF_DAY, 0);
		start.set(Calendar.MINUTE, 0);
		start.set(Calendar.SECOND, 0);
		
		end.set(Calendar.YEAR, year);
		end.set(Calendar.MONTH, month);
		end.set(Calendar.DAY_OF_MONTH, date);
		end.set(Calendar.HOUR_OF_DAY, 23);
		end.set(Calendar.MINUTE, 59);
		end.set(Calendar.SECOND, 59);
		return payRepository.findAllBySubscription_SubscriptionExpirationBetween(start, end);
	}
	@Override
	public Boolean deletePay(Long seq, String uid) throws IOException {
		Optional<Pay> o = payRepository.findBySubscription_FederatedSubscription_BusinessSeqAndSubscription_Member_MemberUid(seq, uid);
		if(o.isPresent()) {
			Pay p = o.get();
			String reqURL = "https://kapi.kakao.com/v1/payment/manage/subscription/inactive";
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			conn.setRequestProperty("Authorization", "KakaoAK d08fb758ac87e7487a96eb2cf1bd4b5e");
			conn.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			StringBuilder sb = new StringBuilder();
			sb.append("cid=" + p.getPayCid());
			sb.append("&sid=" + p.getPaySid());
			

			bw.write(sb.toString());
			bw.flush();

			int responseCode = conn.getResponseCode();
			System.out.println(responseCode);
			if(responseCode == 200) {
				Subscription s = p.getSubscription();
				s.setSubscriptionRenew(false);
				subscriptionRepository.save(s);
				payRepository.delete(p);
				return true;
			}else {
				return false;
			}
		}
		return false;
	}
}
