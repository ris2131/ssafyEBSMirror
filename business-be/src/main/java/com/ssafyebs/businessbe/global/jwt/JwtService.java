package com.ssafyebs.businessbe.global.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface JwtService {
    String createAccessToken(String emial);
    String createRefreshToken();
    boolean validateToken(String accessToken);
    long getBusinessSeqFromPayload(String accessToken) throws JsonProcessingException;
    boolean compareRefreshToken(String refreshToken);
}
