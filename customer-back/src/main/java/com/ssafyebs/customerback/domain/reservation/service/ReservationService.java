package com.ssafyebs.customerback.domain.reservation.service;

import java.util.List;

import com.ssafyebs.customerback.domain.reservation.entity.Reservation;

public interface ReservationService {
	List<Reservation> findByMember_MemberUid(String memberUid);
	Reservation makeReserve(Reservation reservation);
}
