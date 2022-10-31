package com.ssafyebs.businessbe.domain.business.service;

import com.ssafyebs.businessbe.domain.business.dto.requestdto.LoginRequestDto;
import com.ssafyebs.businessbe.domain.business.dto.responsedto.LoginResponseDto;
import com.ssafyebs.businessbe.domain.business.entity.Business;
import com.ssafyebs.businessbe.domain.business.repository.BusinessRepository;
import com.ssafyebs.businessbe.global.exception.NoExistBusinessException;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService{

    private final BusinessRepository businessRepository;

    final static Logger logger = LogManager.getLogger(LoginServiceImpl.class);

    @Override
    public HttpHeaders createTokenHeader(String accessToken, String refreshToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer "+accessToken);
        headers.add("refreshToken","Bearer "+refreshToken);
        return headers;
    }
    @Override
    public void updateRefreshToken(String email, String refreshToken) {
        Business business = businessRepository.findByEmail(email).orElseThrow(() -> new NoExistBusinessException("존재하는 회원정보가 없습니다."));
        business.updateRefreshToken(refreshToken);

        businessRepository.save(business);
    }

    //미구현
    @Override
    public LoginResponseDto loginEbs(LoginRequestDto loginRequestDto) {
        return null;
    }
}
