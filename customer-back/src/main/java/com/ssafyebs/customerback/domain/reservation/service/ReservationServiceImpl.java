package com.ssafyebs.customerback.domain.reservation.service;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

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

	@Override
	public Optional<Reservation> findByFederatedReservation_DesignerSeqAndReservationDate(Long seq, Calendar date) {
		// TODO Auto-generated method stub
		return reservationRepository.findByFederatedReservation_DesignerSeqAndReservationDate(seq, date);
	}

}
