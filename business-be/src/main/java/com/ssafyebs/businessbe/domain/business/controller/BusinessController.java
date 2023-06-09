package com.ssafyebs.businessbe.domain.business.controller;

import com.ssafyebs.businessbe.domain.business.dto.requestdto.BusinessCreationRequestDto;
import com.ssafyebs.businessbe.domain.business.dto.requestdto.BusinessEmailRequestDto;
import com.ssafyebs.businessbe.domain.business.dto.responsedto.BusinessResponseDto;
import com.ssafyebs.businessbe.domain.business.service.BusinessService;
import com.ssafyebs.businessbe.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    final static Logger logger = LoggerFactory.getLogger(BusinessController.class);
    @GetMapping()
    public ResponseEntity<?> getBusiness(HttpServletRequest request){
        long businessSeq = (long)request.getAttribute("business_seq");
        BusinessResponseDto businessResponseDto = businessService.getBusiness(businessSeq);
        return ResponseEntity.status(HttpStatus.CREATED).body(CommonResponse.createSuccess("반환 성공", businessResponseDto));
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> createBusiness(@RequestBody BusinessCreationRequestDto businessCreationRequestDto){
        logger.debug("business/sign-up");

        businessService.create(businessCreationRequestDto);


        return ResponseEntity.status(HttpStatus.CREATED).body(CommonResponse.createSuccess("인증 메일이 발송되었습니다.\n 이메일 인증 후 사이트를 이용할 수 있습니다.", null));
    }

    @PostMapping("/check-email")
    public ResponseEntity<?> checkEmail (@RequestBody BusinessEmailRequestDto businessEmailRequestDto){
        boolean chk = businessService.checkEmail(businessEmailRequestDto);
        if (!chk){
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

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPasswordPost(HttpServletRequest request) {
        long businessSeq = (long) request.getAttribute("business_seq");
        businessService.resetPassword(businessSeq);

        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("인증 메일이 발송되었습니다.",false));
    }
}
