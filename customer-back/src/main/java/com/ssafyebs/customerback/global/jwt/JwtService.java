package com.ssafyebs.customerback.global.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface JwtService {
    String createAccessToken(String memberuid);
    String createRefreshToken();
    boolean validateToken(String accessToken);

    boolean compareRefreshToken(String refreshToken);
    String getMemberUidFromPayload(String accessToken) throws JsonProcessingException;

}
