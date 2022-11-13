package com.ssafyebs.businessbe.domain.manage.dto.requestDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafyebs.businessbe.domain.business.entity.Business;
import com.ssafyebs.businessbe.domain.manage.entity.Designer;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DesignerRequestDto {
    @JsonProperty("designer_seq")
    private Long designerSeq;
    private String name;
    private String description;
    private String photo;

    public Designer toEntity(Business business) {
        return Designer.builder()
                .business(business)
                .name(this.name)
                .description(this.description)
                .photo(this.photo == null ? "https://business.ssafy-ebs.com/photo/designer/default.png" : this.photo)
                .build();
    }
}
