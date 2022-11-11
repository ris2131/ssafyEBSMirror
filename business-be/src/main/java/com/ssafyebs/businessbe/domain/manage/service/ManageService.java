package com.ssafyebs.businessbe.domain.manage.service;

import com.ssafyebs.businessbe.domain.business.controller.LoginController;
import com.ssafyebs.businessbe.domain.business.entity.Business;
import com.ssafyebs.businessbe.domain.business.repository.BusinessRepository;
import com.ssafyebs.businessbe.domain.manage.dto.requestDto.DesignerRequestDto;
import com.ssafyebs.businessbe.domain.manage.dto.requestDto.ManageRequestDto;
import com.ssafyebs.businessbe.domain.manage.dto.responseDto.DesignerResponseDto;
import com.ssafyebs.businessbe.domain.manage.dto.responseDto.DetailResponseDto;
import com.ssafyebs.businessbe.domain.manage.dto.responseDto.ManageResponseDto;
import com.ssafyebs.businessbe.domain.manage.dto.responseDto.ScheduleResponseDto;
import com.ssafyebs.businessbe.domain.manage.entity.Designer;
import com.ssafyebs.businessbe.domain.manage.entity.FederatedReservation;
import com.ssafyebs.businessbe.domain.manage.entity.Hairshop;
import com.ssafyebs.businessbe.domain.manage.projection.ReservationTimeAndSeq;
import com.ssafyebs.businessbe.domain.manage.repository.DesignerRepository;
import com.ssafyebs.businessbe.domain.manage.repository.FederatedReservationRepository;
import com.ssafyebs.businessbe.domain.manage.repository.HairshopRepository;
import com.ssafyebs.businessbe.global.exception.*;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ManageService {
    private final BusinessRepository businessRepository;
    private final HairshopRepository hairshopRepository;
    private final DesignerRepository designerRepository;
    private final FederatedReservationRepository reservationRepository;

    final static Logger logger = LogManager.getLogger(LoginController.class);

    private final String[] ALLOWED_IMAGE_MIMES = new String[]{"image/jpeg", "image/png"};
    @Value("${image-path.hairshop}")
    String IMAGE_PATH;

    @Value("${image-url.hairshop}")
    String IMAGE_URL_PREFIX;

    public void registerHairshop(long businessSeq) {
        if (!businessRepository.findByBusinessSeq(businessSeq).isPresent()) {
            throw new NoExistBusinessException("잘못된 로그인 정보입니다.");
        }
        Business business = businessRepository.findByBusinessSeq(businessSeq).get();
        if (!hairshopRepository.findHairshopByBusiness(business).isPresent()) {
            throw new NoExistBusinessException("잘못된 로그인 정보입니다.");
        }
        Hairshop hairshop = hairshopRepository.findHairshopByBusiness(business).get();
        if(hairshop.getName()==null || hairshop.getPhone()==null || hairshop.getAddress()==null){
            throw new InsufficientHairshopInfoException("헤어샵 정보가 모두 기입 되지 않았습니다. : 헤어숍");
        }
        List<Designer> designerList = designerRepository.findAllByBusinessBusinessSeq(businessSeq);
        if(designerList.size()==0){
            System.out.println("designer size 0");
            throw new InsufficientHairshopInfoException("헤어샵 정보가 모두 기입 되지 않았습니다. : 디자이너");
        }

        if (hairshop.isVisible()) {
            throw new AlreadyVisibleException("이미 등록된 매장입니다.");
        }
        hairshop.setVisible(true);
        hairshopRepository.save(hairshop);
    }

    public ManageResponseDto management(long businessSeq) {
        if (!businessRepository.findByBusinessSeq(businessSeq).isPresent()) {
            throw new NoExistBusinessException("잘못된 로그인 정보입니다.");
        }
        Business business = businessRepository.findByBusinessSeq(businessSeq).get();
        if (!hairshopRepository.findHairshopByBusiness(business).isPresent()) {
            throw new NoExistBusinessException("잘못된 로그인 정보입니다.");
        }
        Hairshop hairshop = hairshopRepository.findHairshopByBusiness(business).get();
        ManageResponseDto manageResponseDto = new ManageResponseDto();
        manageResponseDto.getDtoFromEntity(hairshop);
        return manageResponseDto;
    }

    public void managementModify(long businessSeq, ManageRequestDto manageRequestDto) {
        if (!businessRepository.findByBusinessSeq(businessSeq).isPresent()) {
            throw new NoExistBusinessException("잘못된 로그인 정보입니다.");
        }
        Business business = businessRepository.findByBusinessSeq(businessSeq).get();
        if (!hairshopRepository.findHairshopByBusiness(business).isPresent()) {
            throw new NoExistBusinessException("잘못된 로그인 정보입니다.");
        }
        Hairshop hairshop = hairshopRepository.findHairshopByBusiness(business).get();
        hairshop.setName(manageRequestDto.getName());
        hairshop.setPhone(manageRequestDto.getPhone());
        hairshop.setAddress(manageRequestDto.getAddress());
        hairshop.setPhoto(manageRequestDto.getPhoto());
        hairshop.setNotice(manageRequestDto.getNotice());
        hairshop.setDescription(manageRequestDto.getDescription());
        hairshop.setHomepage(manageRequestDto.getHomepage());
        hairshopRepository.save(hairshop);
    }

    public String uploadFile(MultipartFile multipartFile, long businessSeq) {
        if (multipartFile == null || multipartFile.getContentType() == null || Arrays.stream(ALLOWED_IMAGE_MIMES).noneMatch(multipartFile.getContentType()::equals)) {
            throw new InvalidFileException("잘못된 파일 입력입니다.");
        }
        String file = multipartFile.getOriginalFilename();
        if (file == null) {
            throw new InvalidFileException("잘못된 파일 입력입니다.");
        }
        String fileExt = file.substring(file.lastIndexOf(".") + 1);

        File newFile = new File(IMAGE_PATH + businessSeq + "." + fileExt);
        logger.debug(newFile.getPath());
        try {
            multipartFile.transferTo(newFile);
        } catch (FileNotFoundException e) {
            throw new FileNotWritableException("존재하지 않는 파일입니다.");
        } catch (IOException e) {
            throw new FileNotWritableException("파일을 업로드하는 과정에서 오류가 발생했습니다.");
        }
        return IMAGE_URL_PREFIX + newFile.getName();
    }

    public List<DesignerResponseDto> designerList(long businessSeq) {
        List<Designer> designers = designerRepository.findAllByBusinessBusinessSeq(businessSeq);
        List<DesignerResponseDto> returnList = new LinkedList<>();
        for (Designer designer : designers) {
            DesignerResponseDto designerResponseDto = new DesignerResponseDto();
            designerResponseDto.getDtoFromEntity(designer);
            returnList.add(designerResponseDto);
        }
        return returnList;
    }
    public DesignerResponseDto designerInfoGet(long designerSeq){
        Designer designer = designerRepository.findDesignerByDesignerSeq(designerSeq).orElseThrow(() -> new NoSuchDesignerException("존재하지 않는 디자이너 정보입니다."));
        DesignerResponseDto designerResponseDto = new DesignerResponseDto();
        designerResponseDto.getDtoFromEntity(designer);
        return designerResponseDto;
    }
    public void designerInsert(long businessSeq, DesignerRequestDto designerRequestDto) {
        if (!businessRepository.findByBusinessSeq(businessSeq).isPresent()) {
            throw new NoExistBusinessException("잘못된 로그인 정보입니다.");
        }
        Business business = businessRepository.findByBusinessSeq(businessSeq).get();
        designerRepository.save(designerRequestDto.toEntity(business));
    }

    public void designerModify(long businessSeq, DesignerRequestDto designerRequestDto) {
        if (!businessRepository.findByBusinessSeq(businessSeq).isPresent()) {
            throw new NoExistBusinessException("잘못된 로그인 정보입니다.");
        }
        Business business = businessRepository.findByBusinessSeq(businessSeq).get();
        if (!designerRepository.findDesignerByDesignerSeq(designerRequestDto.getDesignerSeq()).isPresent()) {
            throw new NoSuchDesignerException("존재하지 않는 디자이너 정보입니다.");
        }
        Designer designer = designerRepository.findDesignerByDesignerSeq(designerRequestDto.getDesignerSeq()).get();
        if (!business.equals(designer.getBusiness())) {
            throw new UnauthorizedAccessException("잘못된 접근입니다.");
        }

        designer.setBusiness(business);
        designer.setName(designerRequestDto.getName());
        designer.setDescription(designerRequestDto.getDescription());
        designer.setPhoto(designerRequestDto.getPhoto());
        designerRepository.save(designer);
    }

    public void designerDelete(long businessSeq, long designerSeq) {
        if (!businessRepository.findByBusinessSeq(businessSeq).isPresent()) {
            throw new NoExistBusinessException("잘못된 로그인 정보입니다.");
        }
        Business business = businessRepository.findByBusinessSeq(businessSeq).get();
        if (!designerRepository.findDesignerByDesignerSeq(designerSeq).isPresent()) {
            throw new NoSuchDesignerException("존재하지 않는 디자이너 정보입니다.");
        }
        Designer designer = designerRepository.findDesignerByDesignerSeq(designerSeq).get();
        if (!business.equals(designer.getBusiness())) {
            throw new UnauthorizedAccessException("잘못된 접근입니다.");
        }
        designerRepository.delete(designer);
    }

    public List<ScheduleResponseDto> schedule(long businessSeq, String date) {
        if (!businessRepository.findByBusinessSeq(businessSeq).isPresent()) {
            throw new NoExistBusinessException("잘못된 로그인 정보입니다.");
        }
        List<Designer> designers = designerRepository.findAllByBusinessBusinessSeq(businessSeq);

        Calendar day = Calendar.getInstance();
        SimpleDateFormat formatToCalendar = new SimpleDateFormat("yyyyMMdd");
        try {
            day.setTime(formatToCalendar.parse(date));
        } catch (ParseException e) {
            throw new InvalidDateException("유효하지 않은 날짜입니다.");
        }

        SimpleDateFormat formatToString = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        System.out.println(formatToString.format(day.getTime()));

        day.set(Calendar.HOUR_OF_DAY, 0);
        day.set(Calendar.MINUTE, 0);
        day.set(Calendar.SECOND, 0);
        String startTime = formatToString.format(day.getTime());

        day.add(Calendar.DATE, 1);
        String endTime = formatToString.format(day.getTime());

        LinkedList<ScheduleResponseDto> resultList = new LinkedList<>();
        for (Designer designer : designers) {
            if (!reservationRepository.findReservationByDesignerSeqAndReservationDateBetween(designer.getDesignerSeq(), startTime, endTime).isPresent())
                continue;
            List<ReservationTimeAndSeq> reservations = reservationRepository.findReservationByDesignerSeqAndReservationDateBetween(designer.getDesignerSeq(), startTime, endTime).get();
            for (ReservationTimeAndSeq reservation : reservations) {
                ScheduleResponseDto scheduleResponseDto = new ScheduleResponseDto();
                scheduleResponseDto.setReservationSeq(reservation.getReservationSeq());
                scheduleResponseDto.setTime(reservation.getReservationDate());
                scheduleResponseDto.setDesignerSeq(designer.getDesignerSeq());
                scheduleResponseDto.setName(designer.getName());
                scheduleResponseDto.setPhoto(designer.getPhoto());
                resultList.add(scheduleResponseDto);
            }
        }
        return resultList;
    }

    public DetailResponseDto detail(long businessSeq, long reservationSeq) {
        if (!reservationRepository.findByReservationSeq(reservationSeq).isPresent())
            throw new InvalidRequestParamException("잘못된 요청입니다.");

        FederatedReservation reservation = reservationRepository.findByReservationSeq(reservationSeq).get();

        if (!designerRepository.existsByDesignerSeqAndBusiness_BusinessSeq(reservation.getDesignerSeq(), businessSeq))
            throw new UnauthorizedAccessException("잘못된 접근입니다.");

        DetailResponseDto detailResponseDto = new DetailResponseDto();
        detailResponseDto.setMemberNickname(reservation.getMemberNickname());
        detailResponseDto.setReservationStyle(reservation.getReservationStyle());
        detailResponseDto.setReservationService(reservation.getReservationService());
        detailResponseDto.setReservationEtc(reservation.getReservationEtc());
        return detailResponseDto;
    }
}