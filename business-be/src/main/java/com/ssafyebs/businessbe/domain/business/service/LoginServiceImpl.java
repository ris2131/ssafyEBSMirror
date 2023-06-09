package com.ssafyebs.businessbe.domain.business.service;

import com.ssafyebs.businessbe.domain.business.dto.requestdto.LoginRequestDto;
import com.ssafyebs.businessbe.domain.business.dto.responsedto.LoginResponseDto;
import com.ssafyebs.businessbe.domain.business.entity.Business;
import com.ssafyebs.businessbe.domain.business.repository.BusinessRepository;
import com.ssafyebs.businessbe.domain.manage.repository.HairshopRepository;
import com.ssafyebs.businessbe.global.exception.NoExistBusinessException;
import com.ssafyebs.businessbe.global.exception.NoMatchCurPasswordException;
import com.ssafyebs.businessbe.global.util.CryptoUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService{

    private final BusinessRepository businessRepository;
    private final HairshopRepository hairshopRepository;

    final static Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);

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

    @Override
    public LoginResponseDto loginEbs(LoginRequestDto loginRequestDto) {
        String email = loginRequestDto.getEmail();
        Business business = businessRepository.findByEmail(email).orElseThrow(()->new NoExistBusinessException("로그인 할 수 없습니다."));

        String cPassword = CryptoUtil.Sha256.hash(loginRequestDto.getPassword());

        if(!business.getPassword().equals(cPassword)){
            throw new NoMatchCurPasswordException("로그인 할 수 없습니다.");
        }

        if (!hairshopRepository.findHairshopByBusiness(business).isPresent()) {
            logger.warn("Hairshop 생성 실패");
            throw new NoExistBusinessException("로그인 할 수 없습니다.");
        }

        boolean isVisible = hairshopRepository.findHairshopByBusiness(business).get().isVisible();

        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setHairShopVisible(isVisible);
        return loginResponseDto;
    }
}