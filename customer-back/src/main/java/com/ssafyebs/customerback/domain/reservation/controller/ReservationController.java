package com.ssafyebs.customerback.domain.reservation.controller;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafyebs.customerback.domain.member.service.MemberService;
import com.ssafyebs.customerback.domain.reservation.dto.ReservationRequestDto;
import com.ssafyebs.customerback.domain.reservation.entity.FederatedReservation;
import com.ssafyebs.customerback.domain.reservation.entity.Reservation;
import com.ssafyebs.customerback.domain.reservation.service.FederatedReservationService;
import com.ssafyebs.customerback.domain.reservation.service.ReservationService;
import com.ssafyebs.customerback.domain.subscribe.entity.Subscription;
import com.ssafyebs.customerback.domain.subscribe.service.SubscriptionService;
import com.ssafyebs.customerback.global.exception.DuplicateDateException;
import com.ssafyebs.customerback.global.exception.NoExistSubscriptionException;
import com.ssafyebs.customerback.global.response.CommonResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationController {
	
	private final ReservationService reservationService;
	private final FederatedReservationService federatedReservationService;
	private final MemberService memberService;
	private final SubscriptionService subscriptionService;
	private final EntityManager em;
	
	@GetMapping("")
	public ResponseEntity<?> getReservationList(HttpServletRequest request){
		//HttpServletRequest request
//		String memberUid = "3262732023";
		String memberUid = (String)request.getAttribute("memberuid");
		return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("예약정보 조회 완료.",reservationService.findByMember_MemberUid(memberUid)));
	}
	
	@PostMapping("")
	public ResponseEntity<?> makeReservation(HttpServletRequest request, @RequestBody ReservationRequestDto reservationRequestDto) throws ParseException{
		
		//jwt에서 아이디 불러오는 부분 있어야함
		String memberUid = (String)request.getAttribute("memberuid");
//		String memberUid = "3262732023";
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss", Locale.KOREA);
		Date date = simpleDateFormat.parse(reservationRequestDto.getReservationDate());
		cal.setTime(date);
		
		if(!reservationService.findByFederatedReservation_DesignerSeqAndReservationDate(reservationRequestDto.getDesignerSeq(), cal).isPresent()) {
			
			//디자이너 조회
			FederatedReservation f = federatedReservationService.findByDesignerSeq(reservationRequestDto.getDesignerSeq()).get();
			
			//구독 조회
			if(!subscriptionService.findByMember_MemberUidAndFederatedSubscription_BusinessSeq(memberUid, f.getBusinessSeq())) {
				throw new NoExistSubscriptionException("구독권이 없거나 만료되었습니다.");
			}
			Subscription s = subscriptionService.findTop1ByMember_MemberUidAndFederatedSubscription_BusinessSeqOrderBySubscriptionSeqDesc(memberUid, f.getBusinessSeq()).get(0);
			s.setSubscriptionLeft(s.getSubscriptionLeft()-1);
			subscriptionService.makeSubscription(s);
			em.clear();
			
			//reservation 객체 생성
			Reservation reservation = new Reservation();
			reservation.setMember(memberService.findByMemberUid(memberUid).get());
			reservation.setFederatedReservation(f);
			reservation.setReservationDate(cal);
			reservation.setReservationPhoto(reservationRequestDto.getReservationPhoto());
			reservation.setReservationEtc(reservationRequestDto.getReservationEtc());
			reservation.setReservationService(reservationRequestDto.getReservationService());
			reservation.setReservationStyle(reservationRequestDto.getReservationStyle());
			
			//reservation 객체 저장
			reservationService.makeReserve(reservation);
			em.clear();
			
			return ResponseEntity.status(HttpStatus.CREATED).body(CommonResponse.createSuccess("예약 완료.",reservation));
		}else {
			throw new DuplicateDateException("시간대가 중복됩니다.");
		}
	}
	
	@GetMapping("/{business_seq}/{reservation_date}")
	public ResponseEntity<?> getAvailableDesignerList(@PathVariable("business_seq")Long seq, @PathVariable("reservation_date")String date){
		return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("디자이너 리스트 조회 완료.", reservationService.findByFederatedReservation_BusinessSeqAndReservationDateNot(seq, date)));
	}

	@PostMapping("/photo")
	public ResponseEntity<?> reservationPhotoPost(HttpServletRequest request, @RequestParam("reservation_seq") long reservationSeq, @RequestPart("photo") MultipartFile multipartFile) {
		String memberUid = (String) request.getAttribute("memberuid");
		reservationService.insertPhoto(memberUid, reservationSeq, multipartFile);
		return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("성공적으로 저장했습니다.", null));
	}

	@DeleteMapping("/photo")
	public ResponseEntity<?> reservationPhotoDelete(HttpServletRequest request, @RequestParam("photo_url") String photoUrl) {
		String memberUid = (String) request.getAttribute("memberuid");
		reservationService.deletePhoto(memberUid, photoUrl);
		return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("성공적으로 삭제했습니다.", null));
	}
}
