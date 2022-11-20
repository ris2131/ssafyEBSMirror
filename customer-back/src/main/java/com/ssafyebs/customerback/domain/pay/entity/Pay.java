package com.ssafyebs.customerback.domain.pay.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.ssafyebs.customerback.domain.subscribe.entity.Subscription;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pays")
@Getter
@Setter
public class Pay {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pay_seq")
	private Long paySeq;

	@Column(name = "pay_cid")
	private String payCid;

	@Column(name = "pay_sid")
	private String paySid;

	@Column(name = "pay_partner_order_id")
	private String payPartnerOrderId;

	@Column(name = "pay_partner_user_id")
	private String payPartnerUserId;

	@Column(name = "pay_quantity")
	private Long payQuantity;

	@Column(name = "pay_total_amount")
	private Long payTotalAmount;

	@Column(name = "pay_tax_free_amount")
	private Long payTaxFreeAmount;

	@OneToOne
	@JoinColumn(name = "subscription_seq", referencedColumnName = "subscription_seq")
	private Subscription subscription;


}
