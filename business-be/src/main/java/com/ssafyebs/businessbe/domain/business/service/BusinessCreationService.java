package com.ssafyebs.businessbe.domain.business.service;

import com.ssafyebs.businessbe.domain.business.dto.BusinessCreationRequestDto;
import com.ssafyebs.businessbe.domain.business.dto.BusinessCreationResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface BusinessCreationService {
    BusinessCreationResponseDto create(BusinessCreationRequestDto businessCreationRequestDto);
}
