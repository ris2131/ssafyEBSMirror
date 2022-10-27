package com.ssafyebs.customerback.domain.member.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.ssafyebs.customerback.domain.member.dto.GoogleLoginRequestDto;
import com.ssafyebs.customerback.domain.member.dto.MemberInfoResponseDto;
import com.ssafyebs.customerback.domain.member.entity.Member;
import com.ssafyebs.customerback.domain.member.repository.MemberRepository;
import com.ssafyebs.customerback.global.exception.FirstGoogleLoginException;
import com.ssafyebs.customerback.global.exception.NoGoogleAuthorizeException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
//@RequiredArgsConstructor
public class GoogleLoginServiceImpl implements GoogleLoginService{

//    private final GoogleIdTokenVerifier verifier;
//    private final MemberRepository memberRepository;
//    private final MemberService memberService;
//
//
//    public GoogleLoginServiceImpl(@Value("${google.client.id}") String clientId,  MemberRepository memberRepository, MemberService memberService) {
//        NetHttpTransport transport = new NetHttpTransport();
//        JsonFactory jsonFactory = new JacksonFactory();
//        this.memberRepository = memberRepository;
//        this.memberService = memberService;
//        verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
//                .setAudience(Collections.singletonList(clientId))
//                .build();
//    }

//    @Override
//    public MemberInfoResponseDto loginOAuthGoogle(GoogleLoginRequestDto googleLoginRequestDto) {
//        try{
//            GoogleIdToken googleIdToken = verifier.verify(googleLoginRequestDto.getIdToken());
//            if(googleIdToken==null) throw new NoGoogleAuthorizeException("구글 로그인 실패.");
//                //return null;
//            GoogleIdToken.Payload payload = googleIdToken.getPayload();
//            String email = payload.getEmail();
//
//            Member member = memberRepository.findByMemberUid(memberUid).orElseThrow(() -> new FirstGoogleLoginException("첫 로그인 구글 인증 완료."));
//
//            MemberInfoResponseDto memberInfoResponseDto = memberService.getMemberInfo(email);
//
//            return memberInfoResponseDto;
//        }
//        catch (GeneralSecurityException | IOException e){
//            return null;
//        }
//    }
}
