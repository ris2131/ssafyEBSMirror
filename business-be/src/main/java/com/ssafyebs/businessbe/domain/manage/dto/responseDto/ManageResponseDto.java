package com.ssafyebs.businessbe.domain.manage.dto.responseDto;

import com.ssafyebs.businessbe.domain.manage.entity.Hairshop;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ManageResponseDto {
    private String name;
    private String phone;
    private String address;
    private String homepage;
    private String description;
    private String notice;
    private String photo;

    public void getDtoFromEntity(Hairshop hairshop) {
        this.setName(hairshop.getName());
        this.setPhone(hairshop.getPhone());
        this.setAddress(hairshop.getAddress());
        this.setHomepage(hairshop.getHomepage());
        this.setDescription(hairshop.getDescription());
        this.setNotice(hairshop.getNotice());
        this.setPhoto(hairshop.getPhoto());
    }
}
