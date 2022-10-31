package com.ssafyebs.businessbe.global.jwt;

public interface JwtService {
    String createAccessToken(String emial);
    String createRefreshToken();
    boolean validateToken(String accessToken);
    long getBusinessSeqFromPayload(String accessToken);
    boolean compareRefreshToken(String refreshToken);
}
