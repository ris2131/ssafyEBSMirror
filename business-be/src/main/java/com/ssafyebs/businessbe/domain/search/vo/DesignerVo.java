package com.ssafyebs.businessbe.domain.search.vo;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class DesignerVo {
    private Long designerSeq;
    private String name;
    private String description;
    private String photo;

    private long businessSeq;
}
