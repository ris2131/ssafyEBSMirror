package com.ssafyebs.businessbe.domain.business.service;

import com.ssafyebs.businessbe.domain.business.dto.requestdto.BusinessCreationRequestDto;
import com.ssafyebs.businessbe.domain.business.entity.Business;
import com.ssafyebs.businessbe.domain.business.repository.BusinessRepository;
import com.ssafyebs.businessbe.domain.manage.entity.Hairshop;
import com.ssafyebs.businessbe.domain.manage.repository.HairshopRepository;
import com.ssafyebs.businessbe.global.exception.InvalidVerificationKeyException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
    private final BusinessRepository businessRepository;
    private final HairshopRepository hairshopRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void verifyEmail(String verificationKey) throws InvalidVerificationKeyException {
        BusinessCreationRequestDto businessCreationRequestDto = (BusinessCreationRequestDto) redisTemplate.opsForValue().get(verificationKey);

        if (businessCreationRequestDto == null) throw new InvalidVerificationKeyException("유효하지 않은 접근입니다.");
        Business business = businessCreationRequestDto.toEntity();

        //TODO: DuplicateEmailException

        businessRepository.save(business);

        redisTemplate.delete(verificationKey);

        Hairshop hairshop = Hairshop
                .builder()
                .business(business)
                .build();
        hairshopRepository.save(hairshop);
    }

    @Override
    public void resetPassword(String resetKey) {
        // Redis에서 코드를 가져온다.
        /*
        TODO: 1. Redis에서 인증키(256자리)를 가져온다.
        TODO: 2. Redis에 없는 키라면 잘못된 접근임. throw exception
        TODO: 3. Redis에 있는 키라면 회원정보를 가져와서 DB에 저장하고(위에 있는 create Method), Redis 레코드는 삭제.
         */

    }
}
