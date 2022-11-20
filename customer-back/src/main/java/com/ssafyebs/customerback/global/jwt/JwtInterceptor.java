package com.ssafyebs.customerback.global.jwt;


import com.ssafyebs.customerback.domain.member.repository.MemberRepository;
import com.ssafyebs.customerback.global.exception.InvalidateRefreshTokenException;
import com.ssafyebs.customerback.global.exception.NotLoggedInException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class JwtInterceptor implements HandlerInterceptor {
    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if("OPTIONS".equals(request.getMethod())){
            return true;
        }

        try{
            String accessToken = request.getHeader("Authorization").replace("Bearer ", "");
            String refreshToken = request.getHeader("refreshToken");

            if(refreshToken != null) {
                try{
                    if(jwtService.validateToken(refreshToken) && jwtService.compareRefreshToken(refreshToken)){
                        String memberUid = memberRepository.findByMemberToken(refreshToken).get().getMemberUid();
                        String newAccessToken = jwtService.createAccessToken(memberUid);
                        response.setHeader("Authorization","Bearer " + newAccessToken);
                        request.setAttribute("memberUid",memberUid);

                        return true;
                    }
                }catch (InvalidateRefreshTokenException | IllegalArgumentException e){
                    throw new JwtException("유효하지 않은 Refresh Token 입니다.");
                }catch (ExpiredJwtException e){
                    throw new JwtException("Refresh Token 기한이 만료되었습니다. 재로그인 하세요.");
                }catch (SignatureException e){
                    throw new JwtException("Refresh Token의 사용자 인증이 실패하였습니다.");
                }
            }
            if(jwtService.validateToken(accessToken)){
                String memberuid = jwtService.getMemberUidFromPayload(accessToken);
                request.setAttribute("memberuid",memberuid);

                return true;
            }
            else throw new JwtException("유효하지 않은 Access Token 입니다.");
        }catch (ExpiredJwtException e){
            throw new JwtException("Access Token 기한이 만료되었습니다.");
        }catch (SignatureException e){
            throw new JwtException("Access Token의 사용자 인증이 실패하였습니다.");
        }catch (NullPointerException e){
            throw new NotLoggedInException("로그인한 사용자만 접근 가능합니다.");
        }
    }
}