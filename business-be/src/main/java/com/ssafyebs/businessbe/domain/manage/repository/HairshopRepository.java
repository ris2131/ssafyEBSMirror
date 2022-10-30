package com.ssafyebs.businessbe.domain.manage.repository;

import com.ssafyebs.businessbe.domain.business.entity.Business;
import com.ssafyebs.businessbe.domain.manage.entity.Hairshop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HairshopRepository extends JpaRepository<Hairshop, Long> {
    Optional<Hairshop> findHairshopByBusiness(Business business);
}
