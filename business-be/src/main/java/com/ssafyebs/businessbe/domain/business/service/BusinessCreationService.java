package com.ssafyebs.businessbe.domain.business.service;

import com.ssafyebs.businessbe.domain.business.dto.requestdto.BusinessCreationRequestDto;
import org.springframework.stereotype.Service;

@Service
public interface BusinessCreationService {
    void create(BusinessCreationRequestDto businessCreationRequestDto);
}
