package com.ssafyebs.businessbe.domain.business.service;

import org.springframework.http.HttpHeaders;

public interface LoginService {
    HttpHeaders createTokenHeader(String accessToken, String refreshToken);
}
