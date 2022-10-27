package com.ssafyebs.customerback.domain.member.service;


import com.ssafyebs.customerback.domain.member.dto.*;
import com.ssafyebs.customerback.domain.member.entity.Member;

import java.util.Optional;



public interface MemberService {
	public Optional<Member> findByMemberUid(String memberuid);
	
	public void quitUser(String memberuid);
	
	public Member save(Member member);
	
}
