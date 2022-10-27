 package com.ssafyebs.customerback.domain.member.service;


import com.ssafyebs.customerback.domain.member.dto.MemberInfoResponseDto;
import com.ssafyebs.customerback.domain.member.dto.MemberRequestDto;
import com.ssafyebs.customerback.domain.member.dto.MemberResponseDto;
import com.ssafyebs.customerback.domain.member.dto.MemberUpdateInfoRequestDto;
import com.ssafyebs.customerback.domain.member.entity.Member;
import com.ssafyebs.customerback.domain.member.repository.MemberRepository;
import com.ssafyebs.customerback.global.exception.DuplicateNicknameException;
import com.ssafyebs.customerback.global.exception.ExistNicknameException;
import com.ssafyebs.customerback.global.exception.NoExistMemberException;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService{
	
	private final MemberRepository memberRepository;
	
	@Override
	public Optional<Member> findByMemberUid(String memberuid) {
		return memberRepository.findByMemberUid(memberuid);
	}

	@Override
	public void quitUser(String  memberuid) {
		Optional<Member> m = memberRepository.findByMemberUid(memberuid);
		if(m.isPresent()) {
			Member member = m.get();
			member.setMemberLogintype('\0');
			member.setMemberUid("null");
			member.setMemberNickname("null");
			member.setMemberAddress("null");
			member.setMemberToken("null");
			memberRepository.save(member);
		}
		
	}

	@Override
	public Member save(Member member) {
		// TODO Auto-generated method stub
		return memberRepository.save(member);
	}



}
