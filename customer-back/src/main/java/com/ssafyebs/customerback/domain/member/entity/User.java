package com.ssafyebs.customerback.domain.member.entity;

import javax.persistence.*;



import lombok.*;

@Entity
@Table(name="users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
	
	@Id
	@Column(name="user_seq")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userSeq;
	
	@Column(name="user_logintype")
	private char userLogintype;
	
	@Column(name="user_uid")
	private String userUid;
	
	@Column(name="user_nickname")
	private String userNickname;
	
	@Column(name="user_address")
	private String userAddress;
	
	@Column(name="user_token")
	private String userToken;
}
