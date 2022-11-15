package com.ssafyebs.customerback.domain.reservation.entity;

import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name="reservation_photo")
public class ReservationPhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="reservation_photo_seq")
    private Long reservationPhotoSeq;

    @ManyToOne
    @JoinColumn(name="reservation_seq", referencedColumnName="reservation_seq")
    private Reservation reservation;

    @Column(name = "reservation_photo_file_name")
    private int fileName;

    @Column(name = "reservation_photo_url")
    private String photoUrl;
}
