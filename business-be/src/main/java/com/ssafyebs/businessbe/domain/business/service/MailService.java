package com.ssafyebs.businessbe.domain.business.service;

import com.ssafyebs.businessbe.global.exception.InvalidVerificationKeyException;

public interface MailService {
    void verifyEmail(String verificationKey) throws InvalidVerificationKeyException;
    void resetPassword(String resetKey);
}
