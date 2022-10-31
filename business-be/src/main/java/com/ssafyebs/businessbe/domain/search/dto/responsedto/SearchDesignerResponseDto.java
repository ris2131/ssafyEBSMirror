package com.ssafyebs.businessbe.domain.search.dto.responsedto;

import com.ssafyebs.businessbe.domain.search.vo.DesignerVo;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class SearchDesignerResponseDto {
    //List<Designer>designerList;
    List<DesignerVo>designerList;
}
