package com.ssafyebs.businessbe.domain.search.dto.responsedto;

import com.ssafyebs.businessbe.domain.manage.entity.Hairshop;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;



@Getter
@AllArgsConstructor
public class SearchHairshopResponseDto {
    List<Hairshop>hairshopList;
}
