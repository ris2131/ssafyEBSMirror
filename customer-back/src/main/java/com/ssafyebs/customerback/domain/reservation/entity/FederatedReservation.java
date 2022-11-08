package com.ssafyebs.customerback.domain.reservation.entity;

import javax.annotation.concurrent.Immutable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;



import lombok.Getter;

@Entity
@Immutable
@Table(name = "federated_reservations")
@Getter
public class FederatedReservation {
	
	@Id
	@Column(name="designer_seq")
	private Long designerSeq;
	
	@Column(name="business_seq")
	private Long businessSeq;
	
	@Column(name="designer_name")
	private String designerName;
	
	@Column(name="hairshop_name")
	private String hairshopName;
	
	@Column(name="designer_photo")
	private String designerPhoto;
	
	@Column(name="designer_description")
	private String designerDescription;
}
