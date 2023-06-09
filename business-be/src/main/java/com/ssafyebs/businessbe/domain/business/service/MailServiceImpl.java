package com.ssafyebs.businessbe.domain.business.service;

import com.ssafyebs.businessbe.domain.business.dto.requestdto.BusinessCreationRequestDto;
import com.ssafyebs.businessbe.domain.business.entity.Business;
import com.ssafyebs.businessbe.domain.business.repository.BusinessRepository;
import com.ssafyebs.businessbe.domain.manage.entity.Hairshop;
import com.ssafyebs.businessbe.domain.manage.entity.Pricing;
import com.ssafyebs.businessbe.domain.manage.repository.HairshopRepository;
import com.ssafyebs.businessbe.domain.manage.repository.PricingRepository;
import com.ssafyebs.businessbe.global.exception.DuplicateEmailException;
import com.ssafyebs.businessbe.global.exception.InvalidVerificationKeyException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
    private final BusinessRepository businessRepository;
    private final HairshopRepository hairshopRepository;
    private final PricingRepository pricingRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    final static Logger logger = LoggerFactory.getLogger(MailServiceImpl.class);

    @Override
    public void verifyEmail(String emailVerificationCode) {
        BusinessCreationRequestDto businessCreationRequestDto = (BusinessCreationRequestDto) redisTemplate.opsForValue().get(emailVerificationCode);

        if (businessCreationRequestDto == null) throw new InvalidVerificationKeyException("유효하지 않은 접근입니다.");
        Business business = businessCreationRequestDto.toEntity();
        logger.warn("verifyMail password : "+business.getPassword());
        if (businessRepository.existsByEmail(businessCreationRequestDto.getEmail())) throw new DuplicateEmailException("이미 가입된 이메일입니다.");

        businessRepository.save(business);

        redisTemplate.delete(emailVerificationCode);

        Hairshop hairshop = Hairshop
                .builder()
                .business(business)
                .photo("https://business.ssafy-ebs.com/photo/hairshop/default.jpg")
                .build();
        hairshopRepository.save(hairshop);

        final int[][] pricingList = {{6, 6, 55000}, {6, 3, 30000}, {6, 2, 22000}, {12, 1, 12000}};

        for (int[] pricings : pricingList) {
            Pricing pricing = Pricing.builder()
                    .business(business)
                    .month(pricings[0])
                    .number(pricings[1])
                    .price(pricings[2])
                    .build();
            pricingRepository.save(pricing);
        }
    }

    @Override
    public void resetPassword(String passwordResetCode) {
        /*
        TODO: 1. Redis에서 인증키(256자리)를 가져온다.
        TODO: 2. Redis에 없는 키라면 잘못된 접근임. throw exception
        TODO: 3. Redis에 있는 키라면 회원정보를 가져와서 DB에 저장하고(위에 있는 create Method), Redis 레코드는 삭제.
         */
        String email = (String) redisTemplate.opsForValue().get(passwordResetCode);

        if (email == null) throw new InvalidVerificationKeyException("유효하지 않은 접근입니다.");
    }
}
