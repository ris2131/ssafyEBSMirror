package com.ssafyebs.businessbe.domain.business.service;

public interface MailService {
    void verifyEmail(String verificationKey);
    void resetPassword(String resetKey);
}
