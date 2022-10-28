 package com.ssafyebs.customerback.domain.member.service;


import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.ssafyebs.customerback.domain.member.dto.*;
import com.ssafyebs.customerback.domain.member.entity.Member;
import com.ssafyebs.customerback.domain.member.repository.MemberRepository;
import com.ssafyebs.customerback.global.exception.NoExistMemberException;
import com.ssafyebs.customerback.global.exception.NoGoogleAuthorizeException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Optional;

import javax.transaction.Transactional;

@Service
@Transactional
public class MemberServiceImpl implements MemberService{
	
	private final MemberRepository memberRepository;

	private final GoogleIdTokenVerifier verifier;


	public MemberServiceImpl(@Value("${google.client.id}") String clientId,  MemberRepository memberRepository) {
		NetHttpTransport transport = new NetHttpTransport();
		JsonFactory jsonFactory = new JacksonFactory();
		this.memberRepository = memberRepository;
		verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
				.setAudience(Collections.singletonList(clientId))
				.build();
	}

	@Override
	public Optional<Member> findByMemberUid(String memberUid) {
		return memberRepository.findByMemberUid(memberUid);
	}

	@Override
	public void quitUser(String memberUid) {
		Optional<Member> m = memberRepository.findByMemberUid(memberUid);
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

	@Override
	public HttpHeaders createTokenHeader(String accessToken, String refreshToken) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization","Bearer "+accessToken);
		headers.add("refreshToken","Bearer "+refreshToken);

		return headers;
	}
	@Override
	public MemberInfoResponseDto getMemberInfo(String memberUid) {
		Member member = memberRepository.findByMemberUid(memberUid).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));
		MemberInfoResponseDto memberInfoResponseDto = new MemberInfoResponseDto(member);

		return memberInfoResponseDto;
	}
	@Override
	public MemberInfoResponseDto loginOAuthGoogle(GoogleLoginRequestDto googleLoginRequestDto) {
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+googleLoginRequestDto);
		try{
			GoogleIdToken googleIdToken = verifier.verify(googleLoginRequestDto.getIdToken());

			if(googleIdToken==null) throw new NoGoogleAuthorizeException("구글 회원 정보 오류.");
			//return null;
			GoogleIdToken.Payload payload = googleIdToken.getPayload();
			String memberUid = (String) payload.get("sub");


			Member member = memberRepository.findByMemberUid(memberUid).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));

			MemberInfoResponseDto memberInfoResponseDto = this.getMemberInfo(memberUid);

			return memberInfoResponseDto;
		}
		catch (GeneralSecurityException | IOException e){
			return null;
		}
	}

	@Override
	public void updateRefreshToken(String memberUid, String refreshToken) {
		Member member = memberRepository.findByMemberUid(memberUid).orElseThrow(() -> new NoExistMemberException("존재하는 회원정보가 없습니다."));
		member.updateRefreshToken(refreshToken);
		memberRepository.save(member);
	}

	@Override
    public MemberResponseDto signUpOauthGoogle(MemberGoogleRequestDto memberGoogleRequestDto, String refreshToken) {
        try{
            GoogleIdToken googleIdToken = verifier.verify(memberGoogleRequestDto.getIdToken());
            if(googleIdToken==null) throw new NoGoogleAuthorizeException("구글 회원 정보 오류.");

            GoogleIdToken.Payload payload = googleIdToken.getPayload();
			String memberUid = (String) payload.get("sub");

            Member member = Member.builder()
                            .memberUid(memberUid)
                            .memberLogintype('G')
                            .memberNickname(memberGoogleRequestDto.getMemberNickname())
                            .memberAddress(memberGoogleRequestDto.getMemberAddress())
                            .refreshToken(refreshToken)
                            .build();
            memberRepository.save(member);
            MemberResponseDto memberResponseDto = new MemberResponseDto(member);
            return memberResponseDto;
        }
        catch (GeneralSecurityException | IOException e){
            return null;
        }
    }

	@Override
	public String getMemberUid(String idToken){
		try {
			GoogleIdToken googleIdToken = verifier.verify(idToken);
			if (googleIdToken == null) throw new NoGoogleAuthorizeException("구글 회원 정보 오류.");
			GoogleIdToken.Payload payload = googleIdToken.getPayload();
			String memberUid = (String) payload.get("sub");
			return memberUid;
		}
		catch (GeneralSecurityException | IOException e){
			return null;
		}
	}

}
