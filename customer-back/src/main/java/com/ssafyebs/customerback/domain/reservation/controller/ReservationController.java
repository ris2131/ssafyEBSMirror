package com.ssafyebs.customerback.domain.reservation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafyebs.customerback.domain.member.service.MemberService;
import com.ssafyebs.customerback.domain.reservation.dto.ReservationRequestDto;
import com.ssafyebs.customerback.domain.reservation.entity.Reservation;
import com.ssafyebs.customerback.domain.reservation.service.FederatedReservationService;
import com.ssafyebs.customerback.domain.reservation.service.ReservationService;
import com.ssafyebs.customerback.global.jwt.JwtService;
import com.ssafyebs.customerback.global.response.CommonResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationController {
	
	private final ReservationService reservationService;
	private final FederatedReservationService federatedReservationService;
	private final MemberService memberService;
	
	@GetMapping("")
	public ResponseEntity<?> getReservationList(){
		//HttpServletRequest request
		//String memberUid = (String)request.getAttribute("memberuid");
		String memberUid = "3262732023";
		return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("예약정보 조회 완료.",reservationService.findByMember_MemberUid(memberUid)));
	}
	
	@PostMapping("")
	public ResponseEntity<?> makeReservation(@RequestBody ReservationRequestDto reservationRequestDto){
		
		//jwt에서 아이디 불러오는 부분 있어야함
		String memberUid = "3262732023";
		Reservation reservation = new Reservation();
		reservation.setMember(memberService.findByMemberUid(memberUid).get());
		reservation.setFederatedReservation(federatedReservationService.findByDesignerSeq(reservationRequestDto.getDesignerSeq()).get());
		reservation.setReservationDate(reservationRequestDto.getReservationDate());
		reservation.setReservationPhoto(reservationRequestDto.getReservationPhoto());
		reservation.setReservationEtc(reservationRequestDto.getReservationEtc());
		reservation.setReservationService(reservationRequestDto.getReservationService());
		reservation.setReservationStyle(reservationRequestDto.getReservationStyle());
		
		reservationService.makeReserve(reservation);
		
		return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("예약 완료.",reservation));
	}
}
