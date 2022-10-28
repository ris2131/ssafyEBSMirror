package com.ssafyebs.customerback.global.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface JwtService {
    String createAccessToken( String email);
    String createRefreshToken();
    boolean validateToken(String accessToken);

    boolean compareRefreshToken(String refreshToken);
//    String getEmailFromPayload(String accessToken) throws JsonProcessingException;
//
}
