package com.ssafyebs.customerback.domain.subscribe.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Calendar;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafyebs.customerback.domain.member.service.MemberService;
import com.ssafyebs.customerback.domain.pay.entity.Pay;
import com.ssafyebs.customerback.domain.pay.service.PayService;
import com.ssafyebs.customerback.domain.subscribe.dto.SubscriptionRequestDto;
import com.ssafyebs.customerback.domain.subscribe.entity.FederatedPricing;
import com.ssafyebs.customerback.domain.subscribe.entity.Subscription;
import com.ssafyebs.customerback.domain.subscribe.service.FederatedPricingService;
import com.ssafyebs.customerback.domain.subscribe.service.SubscriptionService;
import com.ssafyebs.customerback.global.exception.DuplicateSubscriptionException;
import com.ssafyebs.customerback.global.exception.NoExistSubscriptionException;
import com.ssafyebs.customerback.global.response.CommonResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/subscribe")
@RequiredArgsConstructor
public class SubscriptionController {
	private final SubscriptionService subscriptionService;
	private final MemberService memberService;
	private final PayService payService;
	private final FederatedPricingService FederatedPricingService;
	
	@GetMapping()
	public ResponseEntity<?> getSubscriptionList(HttpServletRequest request){
		String memberUid = (String) request.getAttribute("memberuid");
		System.out.println(memberUid);
//		String memberUid = "3262732023";
		return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("구독정보 조회 완료.",subscriptionService.findByMember_MemberUid(memberUid)));
	}
	
	
	@GetMapping("/{business_seq}")
	public ResponseEntity<?> checkSubscription(HttpServletRequest request, @PathVariable("business_seq")Long seq){
		String memberUid = (String)request.getAttribute("memberuid");
//		String memberUid = "3262732023";
		return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("구독여부 조회 완료.", subscriptionService.findByMember_MemberUidAndFederatedPricing_BusinessSeq(memberUid, seq)));
	}
	
	@DeleteMapping("/{business_seq}")
	public ResponseEntity<?> inactivateSubscription(HttpServletRequest request, @PathVariable("business_seq")Long seq) throws IOException{
		String memberUid = (String)request.getAttribute("memberuid");
		return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("구독 해지 완료", payService.deletePay(seq, memberUid)));
	}
	
	@PostMapping()
	public ResponseEntity<?> makeSubscription(HttpServletRequest request, @RequestBody SubscriptionRequestDto subscriptionRequestDto) throws IOException{
		
		String memberUid = (String)request.getAttribute("memberuid");
//		String memberUid = "3262732023";
		
		String reqURL = "https://kapi.kakao.com/v1/payment/approve";
		URL url = new URL(reqURL);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		
		conn.setRequestMethod("POST");
		conn.setDoOutput(true);
		conn.setRequestProperty("Authorization", "KakaoAK d08fb758ac87e7487a96eb2cf1bd4b5e");
		conn.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
		
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
		String sb = "cid=" + subscriptionRequestDto.getCid() +
				"&tid=" + subscriptionRequestDto.getTid() +
				"&partner_order_id=" + subscriptionRequestDto.getPartner_order_id() +
				"&partner_user_id=" + subscriptionRequestDto.getPartner_user_id() +
				"&pg_token=" + subscriptionRequestDto.getPg_token();
		
		bw.write(sb);
		bw.flush();
		
		int responseCode = conn.getResponseCode();
		System.out.println("responseCode : " + responseCode);
		
		BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String line;
		String result = "";

		while ((line = br.readLine()) != null) {
			result += line;
		}
		System.out.println("response body : " + result);

		JsonParser parser = new JsonParser();
		JsonElement element = parser.parse(result);
		
		//response값 파싱해서 pay 엔티티 만들어서 넣어줘야함.
		Long seq = Long.valueOf(subscriptionRequestDto.getPartner_order_id().substring(5));
		
		Optional<FederatedPricing> f = FederatedPricingService.findByPricingSeq(seq);
		if(f.isPresent()) {
			FederatedPricing fs = f.get();
			if(subscriptionService.findByMember_MemberUidAndFederatedPricing_BusinessSeq(memberUid, fs.getBusinessSeq())) {
				throw new DuplicateSubscriptionException("이미 구독중입니다.");
			}
			Subscription subscription = new Subscription();
			subscription.setMember(memberService.findByMemberUid(memberUid).get());
			subscription.setSubscriptionLeft(fs.getPricingNumber());
			//현재날짜 기준으로 해서 계산해줘야한다. 아래는 그냥 테스트 코드.
			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.MONTH, fs.getPricingMonth().intValue());
			subscription.setSubscriptionExpiration(cal);
			subscription.setFederatedPricing(fs);
			subscription.setSubscriptionRenew(true);
			
			subscriptionService.makeSubscription(subscription);
			Pay p = new Pay();
			//원래는 실제 가맹점 cid가 들어가야 함.
			p.setPayCid("TCSUBSCRIP");
			p.setPaySid(element.getAsJsonObject().get("sid").getAsString());
			p.setPayPartnerOrderId(element.getAsJsonObject().get("partner_order_id").getAsString());
			p.setPayPartnerUserId(element.getAsJsonObject().get("partner_user_id").getAsString());
			p.setPayQuantity(((long)1));
			p.setPayTotalAmount(fs.getPricingPrice());
			p.setPayTaxFreeAmount((long)0);
			p.setSubscription(subscription);
			
			payService.save(p);
			
			return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("구독완료.",null));
		}
		else
			throw new NoExistSubscriptionException("상품이 존재하지 않습니다.");
	}
	
	@GetMapping("/items/{business_seq}")
	public ResponseEntity<?> getItemList(HttpServletRequest request, @PathVariable("business_seq")Long seq){
		return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("구독정보 조회 완료.", FederatedPricingService.findByBusinessSeq(seq)));
	}
	
	@GetMapping("/active")
	public ResponseEntity<?> getActiveSubscribe(HttpServletRequest request){
		String memberUid = (String) request.getAttribute("memberuid");
		return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("현재 활성화된 구독 리스트 조회 완료.", subscriptionService.findByMember_MemberUidAndSubscriptionExpirationGreaterThanAndSubscriptionLeftGreaterThanOrderBySubscriptionSeqDesc(memberUid)));
	}
	

}
