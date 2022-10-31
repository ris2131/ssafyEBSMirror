package com.ssafyebs.customerback.domain.reservation.dto;

import com.ssafyebs.customerback.domain.reservation.entity.FederatedReservation;

import lombok.Getter;

@Getter
public class ReservationRequestDto {
	private Long designerSeq;
	private String reservationDate;
	private String reservationPhoto;
	private String reservationStyle;
	private String reservationService;
	private String reservationEtc;
}
