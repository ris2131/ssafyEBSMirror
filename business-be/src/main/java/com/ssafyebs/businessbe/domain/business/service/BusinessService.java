package com.ssafyebs.businessbe.domain.business.service;

import com.ssafyebs.businessbe.domain.business.dto.requestdto.BusinessCreationRequestDto;
import org.springframework.stereotype.Service;

@Service
public interface BusinessService {
    void create(BusinessCreationRequestDto businessCreationRequestDto);
    void quit(long businessSeq);
}
