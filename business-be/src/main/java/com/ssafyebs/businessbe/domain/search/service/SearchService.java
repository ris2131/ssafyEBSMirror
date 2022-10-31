package com.ssafyebs.businessbe.domain.search.service;

import com.ssafyebs.businessbe.domain.search.dto.responsedto.SearchHairshopResponseDto;


public interface SearchService {
    SearchHairshopResponseDto searchHairshopByKeyword(String keyword);
}
