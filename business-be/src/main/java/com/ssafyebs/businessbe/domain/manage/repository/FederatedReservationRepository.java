package com.ssafyebs.businessbe.domain.manage.repository;

import com.ssafyebs.businessbe.domain.manage.entity.FederatedReservation;
import com.ssafyebs.businessbe.domain.manage.projection.ReservationTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FederatedReservationRepository extends JpaRepository<FederatedReservation, Long> {
    Optional<ReservationTime> findReservationDateByDesignerSeqAndReservationDateBetween(long designerSeq, String startTime, String endTime);
    Optional<FederatedReservation> findByReservationSeq(long reservationSeq);
}
