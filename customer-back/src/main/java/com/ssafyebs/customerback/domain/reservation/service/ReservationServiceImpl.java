package com.ssafyebs.customerback.domain.reservation.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafyebs.customerback.domain.reservation.entity.Reservation;
import com.ssafyebs.customerback.domain.reservation.repository.ReservationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService{

	private final ReservationRepository reservationRepository;
	
	@Override
	public List<Reservation> findByMember_MemberUid(String memberUid) {
		// TODO Auto-generated method stub
		return reservationRepository.findByMember_MemberUid(memberUid);
	}

	@Override
	public Reservation makeReserve(Reservation reservation) {
		return reservationRepository.save(reservation);
	}

}
