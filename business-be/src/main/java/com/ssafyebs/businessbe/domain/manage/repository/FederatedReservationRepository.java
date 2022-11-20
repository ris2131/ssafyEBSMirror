package com.ssafyebs.businessbe.domain.manage.repository;

import com.ssafyebs.businessbe.domain.manage.entity.FederatedReservation;
import com.ssafyebs.businessbe.domain.manage.projection.ReservationTimeAndSeq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FederatedReservationRepository extends JpaRepository<FederatedReservation, Long> {
    Optional<List<ReservationTimeAndSeq>> findReservationByDesignerSeqAndReservationDateBetween(long designerSeq, String startTime, String endTime);
    Optional<FederatedReservation> findByReservationSeq(long reservationSeq);
}
