package com.ssafyebs.businessbe.domain.search.controller;

import com.ssafyebs.businessbe.domain.search.dto.responsedto.SearchDesignerResponseDto;
import com.ssafyebs.businessbe.domain.search.dto.responsedto.SearchHairshopResponseDto;
import com.ssafyebs.businessbe.domain.search.service.SearchService;
import com.ssafyebs.businessbe.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;
    @GetMapping("/hairshop")
    public ResponseEntity<?> searchHairShop(@RequestParam("search_keyword")String keyword){
        SearchHairshopResponseDto searchHairshopResponseDto = searchService.searchHairshopByKeyword(keyword);
        return ResponseEntity.status(HttpStatus.CREATED).body(CommonResponse.createSuccess("헤어샵 검색 완료.", searchHairshopResponseDto));
    }
    @GetMapping("/hairshop/{business_seq}/designer")
    public ResponseEntity<?> searchDesigner(@PathVariable("business_seq")long businessSeq){
        SearchDesignerResponseDto searchDesignerResponseDto = searchService.searchDesignerByHairshop(businessSeq);
        return ResponseEntity.status(HttpStatus.CREATED).body(CommonResponse.createSuccess("디자이너 검색 완료.", searchDesignerResponseDto));
    }
}
