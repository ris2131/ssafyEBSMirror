package com.ssafyebs.customerback.domain.reservation.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafyebs.customerback.domain.reservation.entity.FederatedReservation;
import com.ssafyebs.customerback.domain.reservation.repository.FederatedReservationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FederatedReservationServiceImpl implements FederatedReservationService{

	private final FederatedReservationRepository fRepository;
	
	@Override
	public List<FederatedReservation> findAll() {
		// TODO Auto-generated method stub
		return fRepository.findAll();
	}

}
