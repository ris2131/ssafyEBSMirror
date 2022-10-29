package com.ssafyebs.businessbe.domain.business.repository;

import com.ssafyebs.businessbe.domain.business.entity.Business;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BusinessRepository extends JpaRepository<Business, Long> {
    Optional<Business> findByRefreshToken(String refreshToken);
    Optional<Business> findByEmail(String Email);
}
