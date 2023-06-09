package com.ssafyebs.businessbe.domain.manage.controller;

import com.ssafyebs.businessbe.domain.manage.dto.requestDto.DesignerRequestDto;
import com.ssafyebs.businessbe.domain.manage.dto.requestDto.ManageRequestDto;
import com.ssafyebs.businessbe.domain.manage.dto.responseDto.DesignerResponseDto;
import com.ssafyebs.businessbe.domain.manage.dto.responseDto.DetailResponseDto;
import com.ssafyebs.businessbe.domain.manage.dto.responseDto.ManageResponseDto;
import com.ssafyebs.businessbe.domain.manage.dto.responseDto.ScheduleResponseDto;
import com.ssafyebs.businessbe.domain.manage.service.ManageService;
import com.ssafyebs.businessbe.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/manage")
public class ManageController {
    private final ManageService manageService;

    @PutMapping("/register")
    public ResponseEntity<?> registerHairshop(HttpServletRequest request) {
        long businessSeq = (long) request.getAttribute("business_seq");
        manageService.registerHairshop(businessSeq);

        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("정상적으로 등록되었습니다.", null));
    }

    @GetMapping("")
    public ResponseEntity<?> managementGet(HttpServletRequest request) {
        long businessSeq = (long) request.getAttribute("business_seq");

        ManageResponseDto manageResponseDto = manageService.management(businessSeq);
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("정상적으로 조회되었습니다.", manageResponseDto));
    }

    @PutMapping("")
    public ResponseEntity<?> managementPut(HttpServletRequest request, @RequestPart(value = "photo", required = false) MultipartFile multipartFile, @RequestPart("data") ManageRequestDto manageRequestDto) {
        long businessSeq = (long) request.getAttribute("business_seq");
        if (multipartFile != null && !multipartFile.isEmpty()) {
            String photoUrl = manageService.uploadFile(multipartFile, businessSeq, "hairshop/");
            manageRequestDto.setPhoto(photoUrl);
        }
        manageService.managementModify(businessSeq, manageRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("정상적으로 수정되었습니다.", null));
    }

    @GetMapping("/designers")
    public ResponseEntity<?> designerGet(HttpServletRequest request) {
        long businessSeq = (long) request.getAttribute("business_seq");
        try {
            List<DesignerResponseDto> designerResponseDtos = manageService.designerList(businessSeq);
            return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("정상적으로 조회되었습니다.", designerResponseDtos));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(CommonResponse.createError(e.getMessage()));
        }
    }

    @GetMapping("/designers/{designer_seq}")
    public ResponseEntity<?> designerInfoGet(@PathVariable("designer_seq")long designerSeq) {
        DesignerResponseDto designerResponseDto = manageService.designerInfoGet(designerSeq);
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("정상적으로 조회되었습니다.", designerResponseDto));
    }

    @PostMapping("/designers")
    public ResponseEntity<?> designerPost(HttpServletRequest request, @RequestPart(value = "photo", required = false) MultipartFile multipartFile, @RequestPart("data") DesignerRequestDto designerRequestDto) {
        long businessSeq = (long) request.getAttribute("business_seq");
        long designerSeq = manageService.designerInsert(businessSeq, designerRequestDto, multipartFile);
        if (multipartFile != null && !multipartFile.isEmpty()) {
            String photoUrl = manageService.uploadFile(multipartFile, designerSeq, "designer/");
            designerRequestDto.setPhoto(photoUrl);
        }
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("정상적으로 등록되었습니다.", null));
    }

    @PutMapping("/designers")
    public ResponseEntity<?> designerPut(HttpServletRequest request, @RequestPart(value = "photo", required = false) MultipartFile multipartFile, @RequestPart("data") DesignerRequestDto designerRequestDto) {
        long businessSeq = (long) request.getAttribute("business_seq");
        if (multipartFile != null && !multipartFile.isEmpty()) {
            String photoUrl = manageService.uploadFile(multipartFile, designerRequestDto.getDesignerSeq(), "designer/");
            designerRequestDto.setPhoto(photoUrl);
        }
        manageService.designerModify(businessSeq, designerRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("정상적으로 수정되었습니다.", null));
    }

    @DeleteMapping("/designers")
    public ResponseEntity<?> designerDelete(HttpServletRequest request, @RequestBody DesignerRequestDto designerRequestDto) {
        long businessSeq = (long) request.getAttribute("business_seq");
        try {
            manageService.designerDelete(businessSeq, designerRequestDto.getDesignerSeq());
            return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("정상적으로 삭제되었습니다.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(CommonResponse.createError(e.getMessage()));
        }
    }

    @GetMapping("/calendar")
    public ResponseEntity<?> scheduleGet(HttpServletRequest request, @RequestParam("date") String date) {
        long businessSeq = (long) request.getAttribute("business_seq");
        List<ScheduleResponseDto> resultList = manageService.schedule(businessSeq, date);
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("정상적으로 조회되었습니다.", resultList));
    }

    @GetMapping("/calendar/detail")
    public ResponseEntity<?> scheduleDetailGet(HttpServletRequest request, @RequestParam("reservation_seq") long reservationSeq) {
        long businessSeq = (long) request.getAttribute("business_seq");
        DetailResponseDto detailResponseDto = manageService.detail(businessSeq, reservationSeq);
        return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("정상적으로 조회되었습니다.", detailResponseDto));
    }
}
