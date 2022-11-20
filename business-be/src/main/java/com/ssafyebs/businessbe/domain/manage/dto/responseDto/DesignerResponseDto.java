package com.ssafyebs.businessbe.domain.manage.dto.responseDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafyebs.businessbe.domain.manage.entity.Designer;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DesignerResponseDto {
    @JsonProperty("designer_seq")
    private long designerSeq;
    private String name;
    private String description;
    private String photo;

    public void getDtoFromEntity(Designer designer) {
        this.designerSeq = designer.getDesignerSeq();
        this.name = designer.getName();
        this.description = designer.getDescription();
        this.photo = designer.getPhoto();
    }
}
