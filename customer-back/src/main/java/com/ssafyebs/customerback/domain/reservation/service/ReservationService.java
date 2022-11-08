package com.ssafyebs.customerback.domain.reservation.service;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import com.ssafyebs.customerback.domain.reservation.dto.FederatedReservationResponseDto;
import com.ssafyebs.customerback.domain.reservation.dto.ReservationResponseDto;
import com.ssafyebs.customerback.domain.reservation.entity.FederatedReservation;
import com.ssafyebs.customerback.domain.reservation.entity.Reservation;

public interface ReservationService {
	List<ReservationResponseDto> findByMember_MemberUid(String memberUid);
	Reservation makeReserve(Reservation reservation);
	Optional<Reservation> findByFederatedReservation_DesignerSeqAndReservationDate(Long seq, Calendar date);
	List<FederatedReservationResponseDto> findByFederatedReservation_BusinessSeqAndReservationDateNot(Long seq, String datestr);
}
