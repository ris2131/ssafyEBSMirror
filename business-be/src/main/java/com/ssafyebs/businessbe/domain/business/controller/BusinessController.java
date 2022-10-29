package com.ssafyebs.businessbe.domain.business.controller;

import com.ssafyebs.businessbe.domain.business.dto.requestdto.BusinessCreationRequestDto;
import com.ssafyebs.businessbe.domain.business.service.BusinessCreationService;
import com.ssafyebs.businessbe.domain.business.service.LoginService;
import com.ssafyebs.businessbe.global.jwt.JwtService;
import com.ssafyebs.businessbe.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/business")
@RequiredArgsConstructor
public class BusinessController {
    //회원가입
    private final BusinessCreationService businessCreationService;
    private final LoginService loginService;
    private final JwtService jwtService;
    final static Logger logger = LogManager.getLogger(BusinessController.class);

    @PostMapping("/sign-up")
    public ResponseEntity<?> createBusiness(@RequestBody BusinessCreationRequestDto businessCreationRequestDto){
        logger.debug("business/sign-up");

        businessCreationService.create(businessCreationRequestDto);

        logger.debug("done : createMember");

        return ResponseEntity.status(HttpStatus.CREATED).body(CommonResponse.createSuccess("회원가입이 완료되었습니다.", null));
    }
}