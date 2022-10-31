package com.ssafyebs.customerback.domain.reservation.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafyebs.customerback.domain.reservation.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{
	List<Reservation> findByMember_MemberUid(String memberUid);
	Optional<Reservation> findByFederatedReservation_DesignerSeqAndReservationDate(Long seq, String date);
}
