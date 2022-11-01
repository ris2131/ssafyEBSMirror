package com.ssafyebs.businessbe.domain.search.service;

import com.ssafyebs.businessbe.domain.business.controller.BusinessController;
import com.ssafyebs.businessbe.domain.manage.entity.Designer;
import com.ssafyebs.businessbe.domain.manage.entity.Hairshop;
import com.ssafyebs.businessbe.domain.manage.repository.DesignerRepository;
import com.ssafyebs.businessbe.domain.manage.repository.HairshopRepository;
import com.ssafyebs.businessbe.domain.search.dto.responsedto.SearchDesignerResponseDto;
import com.ssafyebs.businessbe.domain.search.dto.responsedto.SearchHairshopResponseDto;
import com.ssafyebs.businessbe.domain.search.vo.DesignerVo;
import com.ssafyebs.businessbe.domain.search.vo.HairshopVo;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService{
    private final HairshopRepository hairshopRepository;
    private final DesignerRepository designerRepository;

    @Override
    public SearchHairshopResponseDto searchHairshopByKeyword(String keyword) {
        List<Hairshop> hairshopList = hairshopRepository.findHairshopsByVisibleAndNameContaining(true, keyword);
        List<HairshopVo> hairshopVoList = new LinkedList<>();
        HairshopVo hairshopVo;
        for(Hairshop hairshop: hairshopList){
            hairshopVo = HairshopVo.builder()
                    .businessSeq(hairshop.getBusinessSeq())
                    .name(hairshop.getName())
                    .phone(hairshop.getPhone())
                    .address(hairshop.getAddress())
                    .photo(hairshop.getPhoto())
                    .notice(hairshop.getNotice())
                    .description(hairshop.getDescription())
                    .homepage(hairshop.getHomepage())
                    .build();
            hairshopVoList.add(hairshopVo);
        }

        return new SearchHairshopResponseDto(hairshopVoList);
    }
    @Override
    public SearchDesignerResponseDto searchDesignerByHairshop(long businessSeq) {
        List<Designer> designerList = designerRepository.findAllByBusinessBusinessSeq(businessSeq);
        List<DesignerVo> designerVoList = new LinkedList<>();
        DesignerVo designerVo;
        for(Designer designer : designerList){
            designerVo = DesignerVo.builder()
                    .designerSeq(designer.getDesignerSeq())
                    .name(designer.getName())
                    .description(designer.getDescription())
                    .photo(designer.getPhoto())
                    .businessSeq(designer.getBusiness().getBusinessSeq())
                    .build();
            designerVoList.add(designerVo);
        }
        return new SearchDesignerResponseDto(designerVoList);
    }
}