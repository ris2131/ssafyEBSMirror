package com.ssafyebs.businessbe.domain.business.controller;

import com.ssafyebs.businessbe.domain.business.dto.requestdto.LoginRequestDto;
import com.ssafyebs.businessbe.domain.business.dto.responsedto.LoginResponseDto;
import com.ssafyebs.businessbe.domain.business.service.LoginService;
import com.ssafyebs.businessbe.global.jwt.JwtService;
import com.ssafyebs.businessbe.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/business")
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;
    private final JwtService jwtService;

    final static Logger logger = LogManager.getLogger(LoginController.class);

    @PostMapping("/login")
    public ResponseEntity<?> loginBusiness(@RequestBody LoginRequestDto loginRequestDto){
        String email = loginRequestDto.getEmail();

        String accessToken = jwtService.createAccessToken(email);
        String refreshToken = jwtService.createRefreshToken();

        //local login service
        HttpHeaders headers = loginService.createTokenHeader(accessToken, refreshToken);
        loginService.updateRefreshToken(email, refreshToken);

        LoginResponseDto loginResponseDto = loginService.loginEbs(loginRequestDto);

        return ResponseEntity.status(HttpStatus.CREATED).headers(headers).body(CommonResponse.createSuccess("로그인 완료되었습니다.", loginResponseDto));
    }
}
