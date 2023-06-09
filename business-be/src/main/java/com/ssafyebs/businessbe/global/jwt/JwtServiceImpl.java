package com.ssafyebs.businessbe.global.jwt;

import com.ssafyebs.businessbe.domain.business.entity.Business;
import com.ssafyebs.businessbe.domain.business.repository.BusinessRepository;
import com.ssafyebs.businessbe.global.exception.NoExistBusinessException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService{

    @Value("${jwt.secret}")
    private String SECRET_KEY;
    @Value("${jwt.access.subject}")
    private String ACCESS_TOKEN_SUBJECT;
    @Value("${jwt.refresh.subject}")
    private String REFRESH_TOKEN_SUBJECT;
    @Value("${jwt.access.expiration}")
    private int ACCESS_TOKEN_DURATION;
    @Value("${jwt.refresh.expiration}")
    private int REFRESH_TOKEN_DURATION;

    private final BusinessRepository businessRepository;

    //accessToken exists for 1 hour
    @Override
    public String createAccessToken(String email) {
        Date now = new Date();

        Business business = businessRepository.findByEmail(email).orElseThrow(() -> new NoExistBusinessException("존재하는 회원정보가 없습니다."));
        Long businessSeq = business.getBusinessSeq();

        return Jwts.builder()
                .setHeaderParam("typ","JWT")
                .setIssuer("Ebs")
                .setSubject(ACCESS_TOKEN_SUBJECT)
                .setExpiration(new Date(now.getTime() + 1000 * 60L * 60L * 10))
                .claim("business_seq",businessSeq)
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY.getBytes())
                .compact();
    }

    @Override
    public String createRefreshToken() {
        Date now = new Date();

        return Jwts.builder()
                .setHeaderParam("typ","JWT")
                .setIssuer("Ebs")
                .setSubject(REFRESH_TOKEN_SUBJECT)
                .setExpiration(new Date(now.getTime() + 1000L * 60L * 60L * 24L * 30L * 3L ))
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY.getBytes())
                .compact();
    }

    @Override
    public boolean validateToken(String accessToken){
        Jwts.parser().setSigningKey(SECRET_KEY.getBytes()).parseClaimsJws(accessToken);
        return true;
    }

    @Override
    public long getBusinessSeqFromPayload(String accessToken){
        return Jwts.parser().setSigningKey(SECRET_KEY.getBytes()).parseClaimsJws(accessToken).getBody().get("business_seq",Long.class);
    }

    @Override
    public boolean compareRefreshToken(String refreshToken){
        Business business = businessRepository.findByRefreshToken(refreshToken).orElseThrow(() -> new NoSuchElementException("존재하는 회원정보가 없음."));
        String refreshTokenInDBMS = business.getRefreshToken();

        return true;
    }

}
