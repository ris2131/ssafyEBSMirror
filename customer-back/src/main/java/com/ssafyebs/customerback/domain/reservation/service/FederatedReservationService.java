package com.ssafyebs.customerback.domain.reservation.service;

import java.util.List;
import java.util.Optional;

import com.ssafyebs.customerback.domain.reservation.entity.FederatedReservation;

public interface FederatedReservationService {
	List<FederatedReservation> findAll();
	Optional<FederatedReservation> findByDesignerSeq(Long seq);
}
