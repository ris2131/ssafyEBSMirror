package com.ssafyebs.businessbe.domain.business.service;

import com.ssafyebs.businessbe.domain.business.dto.requestdto.BusinessCreationRequestDto;

public interface MailService {
    void create(BusinessCreationRequestDto businessCreationRequestDto);
    void verifyEmail(String verificationKey);
    void resetPassword(String resetKey);
}
