package com.ssafyebs.customerback.global.jwt;


import com.ssafyebs.customerback.domain.member.entity.Member;
import com.ssafyebs.customerback.domain.member.repository.MemberRepository;
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

    private final MemberRepository memberRepository;

    @Override
    public String createAccessToken(String memberuid) {
        Date now = new Date();

        return Jwts.builder()
                .setHeaderParam("typ","JWT")
                .setIssuer("ebs")
                .setSubject(ACCESS_TOKEN_SUBJECT)
                .setExpiration(new Date(now.getTime() + 1000 * 60L * 60L))
                .claim("memberuid",memberuid)
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY.getBytes())
                .compact();
    }

    @Override
    public String createRefreshToken() {
        Date now = new Date();

        return Jwts.builder()
                .setHeaderParam("typ","JWT")
                .setIssuer("ebs")
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
    public boolean compareRefreshToken(String memberToken){
        Member member = memberRepository.findByMemberToken(memberToken).orElseThrow(() -> new NoSuchElementException("존재하는 회원정보가 없음."));
        String refreshTokenInDBMS = member.getMemberToken();

        return true;

    }

    @Override
    public String getMemberUidFromPayload(String accessToken){
        return Jwts.parser().setSigningKey(SECRET_KEY.getBytes()).parseClaimsJws(accessToken).getBody().get("memberuid",String.class);
    }

}
