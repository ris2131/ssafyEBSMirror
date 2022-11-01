package com.ssafyebs.businessbe.domain.business.service;

import com.ssafyebs.businessbe.global.exception.DuplicateEmailException;
import com.ssafyebs.businessbe.global.exception.InvalidVerificationKeyException;

public interface MailService {
    void verifyEmail(String verificationKey) throws InvalidVerificationKeyException, DuplicateEmailException;
    void resetPassword(String resetKey) throws InvalidVerificationKeyException;
}
