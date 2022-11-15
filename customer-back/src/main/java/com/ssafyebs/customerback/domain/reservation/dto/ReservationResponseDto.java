package com.ssafyebs.customerback.domain.reservation.dto;

import java.util.Calendar;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservationResponseDto {
	@JsonProperty("designer_name")
	private String designerName;
	@JsonProperty("hairshop_name")
	private String hairshopName;
	@JsonProperty("business_seq")
	private Long businessSeq;
	@JsonProperty("reservation_date")
	private Calendar reservationDate;
	@JsonProperty("reservation_photo_list")
	private List<String> reservationPhotoList;
	@JsonProperty("reservation_style")
	private String reservationStyle;
	@JsonProperty("reservation_service")
	private String reservationService;
	@JsonProperty("reservation_etc")
	private String reservationEtc;
}
