package com.ssafyebs.customerback.domain.reservation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafyebs.customerback.domain.reservation.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{
	List<Reservation> findByMember_MemberUid(String memberUid);
}
