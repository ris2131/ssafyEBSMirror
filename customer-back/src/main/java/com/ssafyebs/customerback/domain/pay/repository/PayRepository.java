package com.ssafyebs.customerback.domain.pay.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafyebs.customerback.domain.pay.entity.Pay;

public interface PayRepository extends JpaRepository<Pay, Long>{

}
