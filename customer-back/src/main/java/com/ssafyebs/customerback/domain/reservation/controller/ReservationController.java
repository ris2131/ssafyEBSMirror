package com.ssafyebs.customerback.domain.reservation.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafyebs.customerback.domain.reservation.entity.Reservation;
import com.ssafyebs.customerback.domain.reservation.service.ReservationService;
import com.ssafyebs.customerback.global.jwt.JwtService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationController {
	
	private final ReservationService reservationService;
	
	@GetMapping("")
	public List<Reservation> getReservationList(){
		//HttpServletRequest request
		//String memberUid = (String)request.getAttribute("memberuid");
		String memberUid = "";
		return reservationService.findByMember_MemberUid(memberUid);
	}
}
