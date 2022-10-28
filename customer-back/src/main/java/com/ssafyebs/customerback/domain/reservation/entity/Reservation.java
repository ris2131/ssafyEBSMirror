package com.ssafyebs.customerback.domain.reservation.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.ssafyebs.customerback.domain.member.entity.Member;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="reservations")
@Getter
@Setter
public class Reservation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name ="reservation_seq")
	private Long reservationSeq;
	
	@ManyToOne
	@JoinColumn(name="member_seq", referencedColumnName="member_seq")
	private Member member;
	
	@OneToOne
	@JoinColumn(name="designer_seq", referencedColumnName="designer_seq")
	private FederatedReservation federatedReservation;

	@Column(name = "reservation_date")
	private String reservationDate;
	
	@Column(name = "reservation_photo")
	private String reservationPhoto;
	
	@Column(name = "reservation_style")
	private String reservationStyle;
	
	@Column(name = "reservation_service")
	private String reservationService;
	
	@Column(name = "reservation_etc")
	private String reservationEtc;
}
