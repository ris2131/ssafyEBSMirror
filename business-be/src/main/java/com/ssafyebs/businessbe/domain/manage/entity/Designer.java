package com.ssafyebs.businessbe.domain.manage.entity;

import com.ssafyebs.businessbe.domain.business.entity.Business;
import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "designers")
public class Designer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
