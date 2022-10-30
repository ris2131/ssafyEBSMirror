package com.ssafyebs.businessbe.domain.manage.dto.requestDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ManageRequestDto {
    @JsonProperty("business_seq")
    private Long businessSeq;
    private String name;
    private String phone;
    private String address;
    private String homepage;
    private String description;
    private String notice;
    private String photo;
}
