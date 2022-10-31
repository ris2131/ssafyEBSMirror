package com.ssafyebs.customerback.domain.reservation.service;

import java.util.List;
import java.util.Optional;

import com.ssafyebs.customerback.domain.reservation.entity.Reservation;

public interface ReservationService {
	List<Reservation> findByMember_MemberUid(String memberUid);
	Reservation makeReserve(Reservation reservation);
	Optional<Reservation> findByFederatedReservation_DesignerSeqAndReservationDate(Long seq, String date);
}
