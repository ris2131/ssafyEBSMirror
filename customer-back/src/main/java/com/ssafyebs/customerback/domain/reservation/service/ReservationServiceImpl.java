package com.ssafyebs.customerback.domain.reservation.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ssafyebs.customerback.domain.reservation.dto.FederatedReservationResponseDto;
import com.ssafyebs.customerback.domain.reservation.dto.ReservationResponseDto;
import com.ssafyebs.customerback.domain.reservation.entity.FederatedReservation;
import com.ssafyebs.customerback.domain.reservation.entity.Reservation;
import com.ssafyebs.customerback.domain.reservation.repository.FederatedReservationRepository;
import com.ssafyebs.customerback.domain.reservation.repository.ReservationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService{

	private final ReservationRepository reservationRepository;
	private final FederatedReservationRepository federatedReservationRepository;
	
	@Override
	public List<ReservationResponseDto> findByMember_MemberUid(String memberUid) {
		// TODO Auto-generated method stub
		List<ReservationResponseDto> list = new ArrayList<ReservationResponseDto>();
		List<Reservation> rlist = reservationRepository.findByMember_MemberUidOrderByReservationSeq(memberUid);
		
		for(Reservation r : rlist) {
			ReservationResponseDto dto = new ReservationResponseDto();
			dto.setDesignerName(r.getFederatedReservation().getDesignerName());
			dto.setHairshopName(r.getFederatedReservation().getHairshopName());
			dto.setReservationDate(r.getReservationDate());
			dto.setReservationPhoto(r.getReservationPhoto());
			dto.setReservationStyle(r.getReservationStyle());
			dto.setReservationService(r.getReservationService());
			dto.setReservationEtc(r.getReservationEtc());
			list.add(dto);
		}
		
		return list;
	}

	@Override
	public Reservation makeReserve(Reservation reservation) {
		return reservationRepository.save(reservation);
	}

	@Override
	public Optional<Reservation> findByFederatedReservation_DesignerSeqAndReservationDate(Long seq, Calendar date) {
		// TODO Auto-generated method stub
		return reservationRepository.findByFederatedReservation_DesignerSeqAndReservationDate(seq, date);
	}

	@Override
	public List<FederatedReservationResponseDto> findByFederatedReservation_BusinessSeqAndReservationDateNot(Long seq, String datestr) {
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss", Locale.KOREA);
		try {
			List<FederatedReservationResponseDto> resultlist = new ArrayList<FederatedReservationResponseDto>();
			Date date = simpleDateFormat.parse(datestr);
			calendar.setTime(date);
			List<Long> list = new ArrayList<Long>();
			for( Reservation r : reservationRepository.findByFederatedReservation_BusinessSeqAndReservationDate(seq, calendar)) {
				list.add(r.getFederatedReservation().getDesignerSeq());
			}
			if(list.size() != 0) {
				for( FederatedReservation r : federatedReservationRepository.findByBusinessSeqAndDesignerSeqNotIn(seq, list)) {
					resultlist.add(new FederatedReservationResponseDto(r));
				}
			}
			else {
				for( FederatedReservation r : federatedReservationRepository.findByBusinessSeq(seq)) {
					resultlist.add(new FederatedReservationResponseDto(r));
				}
			}
			return resultlist;
			
		} catch(Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}

}
