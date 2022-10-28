package com.ssafyebs.customerback.domain.reservation.service;

import java.util.List;

import com.ssafyebs.customerback.domain.reservation.entity.FederatedReservation;

public interface FederatedReservationService {
	List<FederatedReservation> findAll();
}
