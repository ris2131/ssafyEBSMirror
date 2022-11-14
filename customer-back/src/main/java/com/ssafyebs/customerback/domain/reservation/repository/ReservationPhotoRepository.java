package com.ssafyebs.customerback.domain.reservation.repository;

import com.ssafyebs.customerback.domain.reservation.entity.Reservation;
import com.ssafyebs.customerback.domain.reservation.entity.ReservationPhoto;
import com.ssafyebs.customerback.domain.reservation.projection.ReservationPhotoFileName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReservationPhotoRepository extends JpaRepository<ReservationPhoto, Long>{
    Optional<ReservationPhotoFileName> findTop1ByReservationOrderByFileName(Reservation reservation);
}
