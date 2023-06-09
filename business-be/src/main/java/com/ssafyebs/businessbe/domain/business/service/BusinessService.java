package com.ssafyebs.businessbe.domain.business.service;

import com.ssafyebs.businessbe.domain.business.dto.requestdto.BusinessCreationRequestDto;
import com.ssafyebs.businessbe.domain.business.dto.requestdto.BusinessEmailRequestDto;
import com.ssafyebs.businessbe.domain.business.dto.responsedto.BusinessResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface BusinessService {
    void create(BusinessCreationRequestDto businessCreationRequestDto);
    boolean checkEmail(BusinessEmailRequestDto businessEmailRequestDto);
    void quit(long businessSeq);
    void resetPassword(long businessSeq);

    BusinessResponseDto getBusiness(long businessSeq);
}
