package com.ssafyebs.businessbe.domain.business.repository;

import com.ssafyebs.businessbe.domain.business.entity.Business;
import com.ssafyebs.businessbe.domain.business.projections.BusinessEmail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BusinessRepository extends JpaRepository<Business, Long> {

    Optional<Business> findByBusinessSeq(long businessSeq);
    Optional<Business> findByRefreshToken(String refreshToken);

    Optional<Business> findByEmail(String Email);

    boolean existsByEmail(String email);
    Optional<BusinessEmail> findEmailByBusinessSeq(long businessSeq);
}
