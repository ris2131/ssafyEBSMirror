package com.ssafyebs.customerback.domain.member.controller;


import com.ssafyebs.customerback.domain.member.dto.GoogleLoginRequestDto;
import com.ssafyebs.customerback.domain.member.service.GoogleLoginService;
import com.ssafyebs.customerback.domain.member.service.MemberService;
import com.ssafyebs.customerback.global.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/google-login")
@RequiredArgsConstructor
public class GoogleLoginController {

//    private final GoogleLoginService googleLoginService;
//
//    private final MemberService memberService;
//    private final JwtService jwtService;
//    @Value("${cloud.aws.s3.domain}")
//    String s3Domain ;

//    final static Logger logger = LogManager.getLogger(LoginController.class);
//    @PostMapping
//    public ResponseEntity<?> getGoogleLogin(@RequestBody GoogleLoginRequestDto googleLoginRequestDto){
//        logger.debug("google controller: " + googleLoginRequestDto.getIdToken());
//            MemberInfoResponseDto memberInfoResponseDto = googleLoginService.loginOAuthGoogle(googleLoginRequestDto);
//            String email = memberInfoResponseDto.getEmail();
//            logger.debug("google email : " + email);
//
//            String accessToken = jwtService.createAccessToken(email);
//            String refreshToken = jwtService.createRefreshToken();
//
//            HttpHeaders headers = loginService.createTokenHeader(accessToken, refreshToken);
//            memberService.updateRefreshToken(email, refreshToken);
//
//            return ResponseEntity.status(HttpStatus.OK).headers(headers).body(CommonResponse.createSuccess("로그인 성공적으로 완료 되었습니다.", memberInfoResponseDto));
//    }
}
