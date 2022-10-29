package com.ssafyebs.businessbe.domain.business.service;

import com.ssafyebs.businessbe.domain.business.dto.requestdto.LoginRequestDto;
import com.ssafyebs.businessbe.domain.business.dto.responsedto.LoginResponseDto;
import org.springframework.http.HttpHeaders;

public interface LoginService {
    HttpHeaders createTokenHeader(String accessToken, String refreshToken);
    void updateRefreshToken(String email, String refreshToken);
    LoginResponseDto  loginEbs(LoginRequestDto loginRequestDto);
}
