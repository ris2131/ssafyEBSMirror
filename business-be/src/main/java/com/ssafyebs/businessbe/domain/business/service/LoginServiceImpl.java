package com.ssafyebs.businessbe.domain.business.service;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService{
    @Override
    public HttpHeaders createTokenHeader(String accessToken, String refreshToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer "+accessToken);
        headers.add("refreshToken","Bearer "+refreshToken);
        return headers;
    }
}
