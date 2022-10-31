package com.ssafyebs.businessbe.domain.search.service;

import com.ssafyebs.businessbe.domain.business.controller.BusinessController;
import com.ssafyebs.businessbe.domain.manage.entity.Hairshop;
import com.ssafyebs.businessbe.domain.manage.repository.HairshopRepository;
import com.ssafyebs.businessbe.domain.search.dto.responsedto.SearchHairshopResponseDto;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService{
    private final HairshopRepository hairshopRepository;

    final static Logger logger = LogManager.getLogger(BusinessController.class);
    @Override
    public SearchHairshopResponseDto searchHairshopByKeyword(String keyword) {
        logger.warn("keyword: "+keyword);

        List<Hairshop> hairshopList = hairshopRepository.findHairshopsByVisibleAndNameContaining(true, keyword);
        for(Hairshop hairshop: hairshopList){
            logger.warn(hairshop.getAddress());
        }

        return new SearchHairshopResponseDto(hairshopList);

    }
}
