package com.ssafyebs.customerback.domain.subscribe.entity;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.ForeignKey;

import com.ssafyebs.customerback.domain.member.entity.Member;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="subscriptions")
@Getter
@Setter
public class Subscription {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="subscription_seq")
	private Long subscriptionSeq;
	
	@ManyToOne
	@JoinColumn(name="member_seq", referencedColumnName="member_seq")
	private Member member;
	
	@ManyToOne
	@JoinColumn(name="pricing_seq", referencedColumnName="pricing_seq",foreignKey=@ForeignKey(ConstraintMode.NO_CONSTRAINT))
	private FederatedPricing federatedPricing;
	
	@Column(name="subscription_expiration")
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar subscriptionExpiration;
	
	@Column(name="subscription_left")
	private Long subscriptionLeft;
	
	@Column(name="subscription_renew")
	private Boolean subscriptionRenew;
}
