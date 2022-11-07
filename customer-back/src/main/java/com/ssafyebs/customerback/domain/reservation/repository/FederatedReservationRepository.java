package com.ssafyebs.customerback.domain.reservation.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafyebs.customerback.domain.reservation.entity.FederatedReservation;

public interface FederatedReservationRepository extends JpaRepository<FederatedReservation, Long>{
	Optional<FederatedReservation> findByDesignerSeq(Long seq);
	List<FederatedReservation> findByBusinessSeqAndDesignerSeqNotIn(Long seq, List<Long> list);
	List<FederatedReservation> findByBusinessSeq(Long seq);
}
