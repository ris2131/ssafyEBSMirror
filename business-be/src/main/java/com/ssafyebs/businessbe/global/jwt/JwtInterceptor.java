package com.ssafyebs.businessbe.global.jwt;

import com.ssafyebs.businessbe.domain.business.entity.Business;
import com.ssafyebs.businessbe.domain.business.repository.BusinessRepository;
import com.ssafyebs.businessbe.global.exception.InvalidateRefreshTokenException;
import com.ssafyebs.businessbe.global.exception.NoExistBusinessException;
import com.ssafyebs.businessbe.global.exception.NotLoggeedInException;
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
    private final BusinessRepository businessRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

        if("OPTIONS".equals(request.getMethod())){
            return true;
        }

        try{
            String accessToken = request.getHeader("Authorization").replace("Bearer ", "");
            String refreshToken = request.getHeader("refreshToken");

            if(refreshToken != null) {
                refreshToken = refreshToken.replace("Bearer ", "");
                try{
                    if(jwtService.validateToken(refreshToken) && jwtService.compareRefreshToken(refreshToken)){
                        Business business = businessRepository.findByRefreshToken(refreshToken).orElseThrow(() -> new NoExistBusinessException("존재하는 회원정보가 없습니다."));
                        long businessSeq = business.getBusinessSeq();
                        String email = business.getEmail();
                        String newAccessToken = jwtService.createAccessToken(email);
                        response.setHeader("Authorization","Bearer " + newAccessToken);
                        request.setAttribute("business_seq",businessSeq);

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
                long businessSeq = jwtService.getBusinessSeqFromPayload(accessToken);
                request.setAttribute("business_seq", businessSeq);

                return true;
            }
            else throw new JwtException("유효하지 않은 Access Token 입니다.");
        }catch (ExpiredJwtException e){
            throw new JwtException("Access Token 기한이 만료되었습니다.");
        }catch (SignatureException e){
            throw new JwtException("Access Token의 사용자 인증이 실패하였습니다.");
        }catch (NullPointerException e){
            throw new NotLoggeedInException("로그인한 사용자만 접근 가능합니다.");
        }
    }
}