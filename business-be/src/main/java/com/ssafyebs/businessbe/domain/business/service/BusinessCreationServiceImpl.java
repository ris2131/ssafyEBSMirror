package com.ssafyebs.businessbe.domain.business.service;

import com.ssafyebs.businessbe.domain.business.dto.BusinessCreationRequestDto;
import com.ssafyebs.businessbe.domain.business.dto.BusinessCreationResponseDto;
import com.ssafyebs.businessbe.domain.business.repository.BusinessRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BusinessCreationServiceImpl implements BusinessCreationService {
    private final BusinessRepository businessRepository;
    @Override
    public BusinessCreationResponseDto create(BusinessCreationRequestDto businessCreationRequestDto) {


        return null;
    }
}
