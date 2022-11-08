package com.ssafyebs.customerback.domain.reservation.dto;





import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafyebs.customerback.domain.reservation.entity.FederatedReservation;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class FederatedReservationResponseDto {
	
	@JsonProperty("designer_seq")
	private Long designerSeq;
	@JsonProperty("business_seq")
	private Long businessSeq;
	@JsonProperty("name")
	private String designerName;
	@JsonProperty("h_name")
	private String hairshopName;
	@JsonProperty("photo")
	private String designerPhoto;
	@JsonProperty("description")
	private String designerDescription;
	
	public FederatedReservationResponseDto(FederatedReservation r) {
		this.designerSeq = r.getDesignerSeq();
		this.businessSeq = r.getBusinessSeq();
		this.designerName = r.getDesignerName();
		this.hairshopName = r.getHairshopName();
		this.designerPhoto = r.getDesignerPhoto();
		this.designerDescription = r.getDesignerDescription();
	}
	
}
