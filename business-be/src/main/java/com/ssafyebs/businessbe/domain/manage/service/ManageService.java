package com.ssafyebs.businessbe.domain.manage.service;

import com.ssafyebs.businessbe.domain.business.entity.Business;
import com.ssafyebs.businessbe.domain.business.repository.BusinessRepository;
import com.ssafyebs.businessbe.domain.manage.dto.requestDto.DesignerRequestDto;
import com.ssafyebs.businessbe.domain.manage.dto.requestDto.ManageRequestDto;
import com.ssafyebs.businessbe.domain.manage.dto.responseDto.DesignerResponseDto;
import com.ssafyebs.businessbe.domain.manage.dto.responseDto.ManageResponseDto;
import com.ssafyebs.businessbe.domain.manage.entity.Designer;
import com.ssafyebs.businessbe.domain.manage.entity.Hairshop;
import com.ssafyebs.businessbe.domain.manage.repository.DesignerRepository;
import com.ssafyebs.businessbe.domain.manage.repository.HairshopRepository;
import com.ssafyebs.businessbe.global.exception.AlreadyVisibleException;
import com.ssafyebs.businessbe.global.exception.NoExistBusinessException;
import com.ssafyebs.businessbe.global.exception.NoSuchDesignerException;
import com.ssafyebs.businessbe.global.exception.UnauthorizedAccessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ManageService {
    private final BusinessRepository businessRepository;
    private final HairshopRepository hairshopRepository;
    private final DesignerRepository designerRepository;

    public void registerHairshop(long businessSeq) throws Exception {
        if (!businessRepository.findByBusinessSeq(businessSeq).isPresent()) {
            throw new NoExistBusinessException("잘못된 로그인 정보입니다.");
        }
        Business business = businessRepository.findByBusinessSeq(businessSeq).get();
        if (!hairshopRepository.findHairshopByBusiness(business).isPresent()) {
            throw new NoExistBusinessException("잘못된 로그인 정보입니다.");
        }
        Hairshop hairshop = hairshopRepository.findHairshopByBusiness(business).get();

        if (hairshop.isVisible()) {
            throw new AlreadyVisibleException("이미 등록된 매장입니다.");
        }
        hairshop.setVisible(true);
        hairshopRepository.save(hairshop);
    }

    public ManageResponseDto management(long businessSeq) throws NoExistBusinessException {
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

    public void managementModify(long businessSeq, ManageRequestDto manageRequestDto) throws NoExistBusinessException {
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

    public void designerInsert(long businessSeq, DesignerRequestDto designerRequestDto) throws NoExistBusinessException {
        if (!businessRepository.findByBusinessSeq(businessSeq).isPresent()) {
            throw new NoExistBusinessException("잘못된 로그인 정보입니다.");
        }
        Business business = businessRepository.findByBusinessSeq(businessSeq).get();
        designerRepository.save(designerRequestDto.toEntity(business));
    }

    public void designerModify(long businessSeq, DesignerRequestDto designerRequestDto) throws Exception {
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

    public void designerDelete(long businessSeq, long designerSeq) throws Exception {
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
}