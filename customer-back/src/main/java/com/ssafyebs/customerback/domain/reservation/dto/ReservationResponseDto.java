package com.ssafyebs.customerback.domain.reservation.dto;

import java.util.Calendar;

import com.ssafyebs.customerback.domain.reservation.entity.Reservation;

import lombok.Setter;

@Setter
public class ReservationResponseDto {
	
	
	private String designerName;
	private String hairshopName;
	private Calendar reservationDate;
	private String reservationPhoto;
	private String reservationStyle;
	private String reservationService;
	private String reservationEtc;
	
	public ReservationResponseDto(Reservation r) {
		this.designerName = r.getFederatedReservation().getDesignerName();
		this.hairshopName = r.getFederatedReservation().getHairshopName();
		this.reservationDate = r.getReservationDate();
		this.reservationPhoto = r.getReservationPhoto();
		this.reservationStyle = r.getReservationStyle();
		this.reservationService = r.getReservationService();
		this.reservationEtc = r.getReservationEtc();
	}
}
