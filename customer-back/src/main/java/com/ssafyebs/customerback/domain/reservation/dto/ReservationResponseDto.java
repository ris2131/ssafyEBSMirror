package com.ssafyebs.customerback.domain.reservation.dto;

import java.util.Calendar;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservationResponseDto {
	
	
	private String designerName;
	private String hairshopName;
	private Calendar reservationDate;
	private String reservationPhoto;
	private String reservationStyle;
	private String reservationService;
	private String reservationEtc;
	
	
}
