package com.ssafyebs.businessbe.domain.business.service;

import com.ssafyebs.businessbe.domain.business.dto.requestdto.BusinessCreationRequestDto;
import com.ssafyebs.businessbe.domain.business.dto.requestdto.BusinessEmailRequestDto;
import com.ssafyebs.businessbe.domain.business.entity.Business;
import com.ssafyebs.businessbe.domain.business.repository.BusinessRepository;
import com.ssafyebs.businessbe.domain.manage.entity.Hairshop;
import com.ssafyebs.businessbe.domain.manage.repository.HairshopRepository;
import com.ssafyebs.businessbe.global.exception.NoExistBusinessException;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BusinessServiceImpl implements BusinessService {

    final static Logger logger = LogManager.getLogger(BusinessServiceImpl.class);
    private final BusinessRepository businessRepository;
    private final HairshopRepository hairshopRepository;

    @Override
    public void create(BusinessCreationRequestDto businessCreationRequestDto) {
        Business business = businessCreationRequestDto.toEntity();

        businessRepository.save(business);

        Hairshop hairshop = Hairshop
                .builder()
                .business(business)
                .build();
        hairshopRepository.save(hairshop);
    }

    @Override
    public boolean checkEmail(BusinessEmailRequestDto businessEmailRequestDto) {
        String email = businessEmailRequestDto.getEmail();
        return businessRepository.existsByEmail(email);
    }

    @Override
    public void quit(long businessSeq) {
        Business business = businessRepository.findByBusinessSeq(businessSeq).orElseThrow(()-> new NoExistBusinessException("존재하는 회원정보가 없습니다."));
        Business quitBusiness = Business.builder()
                .businessSeq(business.getBusinessSeq())
                .owner(business.getOwner())
                .build();
        businessRepository.save(quitBusiness);
    }
}
