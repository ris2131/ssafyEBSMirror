package com.ssafyebs.businessbe.domain.manage.entity;

import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "federated_reservations")
public class FederatedReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_seq")
    private Long reservationSeq;

    @Column(name = "member_seq")
    private long memberSeq;

    @Column(name = "member_nickname")
    private String memberNickname;

    @Column(name = "designer_seq")
    private long designerSeq;

    @Column(name = "reservation_date")
    private String reservationDate;

    @Column(name = "reservation_style")
    private String reservationStyle;

    @Column(name = "reservation_service")
    private String reservationService;

    @Column(name = "reservation_etc")
    private String reservationEtc;
}
