package com.ssafyebs.customerback.domain.reservation.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafyebs.customerback.domain.reservation.entity.FederatedReservation;

public interface FederatedReservationRepository extends JpaRepository<FederatedReservation, Long>{
	Optional<FederatedReservation> findByDesignerSeq(Long seq);
}
