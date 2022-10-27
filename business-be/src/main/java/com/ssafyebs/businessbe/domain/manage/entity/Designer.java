package com.ssafyebs.businessbe.domain.manage.entity;

import com.ssafyebs.businessbe.domain.business.entity.Business;
import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "designers")
public class Designer {
    @Id
    @Column(name = "designer_seq")
    private Long designerSeq;

    @ManyToOne
    @JoinColumn(name="business_seq")
    private Business business;

    @Column(name = "designer_name")
    private String name;

    @Column(name = "designer_description")
    private String description;

    @Column(name = "designer_photo")
    private String photo;
}
