package com.ssafyebs.businessbe.domain.search.dto.responsedto;

import com.ssafyebs.businessbe.domain.search.vo.HairshopVo;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;



@Getter
@AllArgsConstructor
public class SearchHairshopResponseDto {
    private List<HairshopVo>hairshopList;
}
