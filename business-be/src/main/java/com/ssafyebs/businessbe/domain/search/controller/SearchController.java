package com.ssafyebs.businessbe.domain.search.controller;

import com.ssafyebs.businessbe.domain.manage.entity.Hairshop;
import com.ssafyebs.businessbe.domain.search.dto.responsedto.SearchHairshopResponseDto;
import com.ssafyebs.businessbe.domain.search.service.SearchService;
import com.ssafyebs.businessbe.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;
    @GetMapping("/hairshop")
    public ResponseEntity<?> searchHairShop(@RequestParam("search_keyword")String keyword){
        SearchHairshopResponseDto searchHairshopResponseDto = searchService.searchHairshopByKeyword(keyword);
        return ResponseEntity.status(HttpStatus.CREATED).body(CommonResponse.createSuccess("검색 완료.", searchHairshopResponseDto));
    }
}
