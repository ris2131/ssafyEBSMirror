package com.ssafyebs.customerback.domain.reservation.repository;

import com.ssafyebs.customerback.domain.reservation.entity.Reservation;
import com.ssafyebs.customerback.domain.reservation.entity.ReservationPhoto;
import com.ssafyebs.customerback.domain.reservation.projection.ReservationPhotoFileCount;
import com.ssafyebs.customerback.domain.reservation.projection.ReservationPhotoMember;
import com.ssafyebs.customerback.domain.reservation.projection.ReservationPhotoUrl;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationPhotoRepository extends JpaRepository<ReservationPhoto, Long>{
    Optional<ReservationPhotoFileCount> findTop1ByReservationOrderByFileCountDesc(Reservation reservation);
    Optional<List<ReservationPhotoUrl>> findTop3ByReservationOrderByFileCountDesc(Reservation reservation);
    Optional<ReservationPhotoMember> findReservationByPhotoUrl(String photoUrl);
    boolean deleteReservationPhotoByPhotoUrl(String photoUrl);
}
