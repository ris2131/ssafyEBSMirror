package com.ssafyebs.businessbe.domain.business.controller;

import com.ssafyebs.businessbe.domain.business.dto.requestdto.BusinessCreationRequestDto;
import com.ssafyebs.businessbe.domain.business.dto.requestdto.BusinessEmailRequestDto;
import com.ssafyebs.businessbe.domain.business.service.BusinessService;
import com.ssafyebs.businessbe.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/business")
@RequiredArgsConstructor
public class BusinessController {
    //회원가입
    private final BusinessService businessService;
    final static Logger logger = LogManager.getLogger(BusinessController.class);

    @PostMapping("/sign-up")
    public ResponseEntity<?> createBusiness(@RequestBody BusinessCreationRequestDto businessCreationRequestDto){
        logger.debug("business/sign-up");

        businessService.create(businessCreationRequestDto);


        return ResponseEntity.status(HttpStatus.CREATED).body(CommonResponse.createSuccess("회원가입이 완료되었습니다.", null));
    }
    @PostMapping("/check-email")
    public ResponseEntity<?> checkEmail (@RequestBody BusinessEmailRequestDto businessEmailRequestDto){
        Boolean chk = businessService.checkEmail(businessEmailRequestDto);
        if (chk==false){
            return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("사용가능한 이메일입니다.",true));
        }
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("이미 존재하는 이메일 입니다.",false));
    }

    @PutMapping("/quit")
    public ResponseEntity<?> quitBusiness(HttpServletRequest request){
        long businessSeq = (long)request.getAttribute("business_seq");
        //service
        businessService.quit(businessSeq);

        return ResponseEntity.status(HttpStatus.CREATED).body(CommonResponse.createSuccess("회원탈퇴가 완료되었습니다.", null));
    }
}
