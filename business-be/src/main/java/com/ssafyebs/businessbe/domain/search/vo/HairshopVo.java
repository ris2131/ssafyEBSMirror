package com.ssafyebs.businessbe.domain.search.vo;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.Column;

@Getter
@Builder
public class HairshopVo {
    private Long businessSeq;
    private String name;
    private String phone;
    private String address;
    private String photo;
    private String notice;
    private String description;
    private String homepage;
}
