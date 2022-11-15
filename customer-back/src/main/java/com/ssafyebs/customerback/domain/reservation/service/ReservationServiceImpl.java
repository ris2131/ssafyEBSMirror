package com.ssafyebs.customerback.domain.reservation.service;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import com.ssafyebs.customerback.domain.reservation.entity.ReservationPhoto;
import com.ssafyebs.customerback.domain.reservation.projection.ReservationPhotoUrl;
import com.ssafyebs.customerback.domain.reservation.repository.ReservationPhotoRepository;
import com.ssafyebs.customerback.global.exception.FileNotWritableException;
import com.ssafyebs.customerback.global.exception.InvalidFileException;
import com.ssafyebs.customerback.global.exception.InvalidReservationSeqException;
import com.ssafyebs.customerback.global.exception.ReservationSeqNotGrantedException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ssafyebs.customerback.domain.reservation.dto.FederatedReservationResponseDto;
import com.ssafyebs.customerback.domain.reservation.dto.ReservationResponseDto;
import com.ssafyebs.customerback.domain.reservation.entity.FederatedReservation;
import com.ssafyebs.customerback.domain.reservation.entity.Reservation;
import com.ssafyebs.customerback.domain.reservation.repository.FederatedReservationRepository;
import com.ssafyebs.customerback.domain.reservation.repository.ReservationRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService{

	private final ReservationRepository reservationRepository;
	private final FederatedReservationRepository federatedReservationRepository;
	private final ReservationPhotoRepository reservationPhotoRepository;

    private final String[] ALLOWED_IMAGE_MIMES = new String[]{"image/jpeg", "image/png"};

    @Value("${image-path}")
    String IMAGE_PATH;

    @Value("${image-url}")
    String IMAGE_URL_PREFIX;

	@Override
	public List<ReservationResponseDto> findByMember_MemberUid(String memberUid) {
		// TODO Auto-generated method stub
		List<ReservationResponseDto> list = new ArrayList<>();
		List<Reservation> rlist = reservationRepository.findByMember_MemberUidOrderByReservationSeq(memberUid);

		for(Reservation r : rlist) {
			ReservationResponseDto dto = new ReservationResponseDto();
			dto.setDesignerName(r.getFederatedReservation().getDesignerName());
			dto.setHairshopName(r.getFederatedReservation().getHairshopName());
			dto.setReservationDate(r.getReservationDate());
			dto.setReservationStyle(r.getReservationStyle());
			dto.setReservationService(r.getReservationService());
			dto.setReservationEtc(r.getReservationEtc());
			dto.setBusinessSeq(r.getFederatedReservation().getBusinessSeq());

			try {
				List<String> urls = reservationPhotoRepository.findTop3ByReservationOrderByFileNameDesc(r).orElseThrow(() -> new RuntimeException(""))
						.stream().map(ReservationPhotoUrl::getPhotoUrl).collect(Collectors.toList());
				dto.setReservationPhotoList(urls);
			} catch (RuntimeException e) {
				dto.setReservationPhotoList(new ArrayList<>());
			}

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
			List<FederatedReservationResponseDto> resultlist = new ArrayList<>();
			Date date = simpleDateFormat.parse(datestr);
			calendar.setTime(date);
			List<Long> list = new ArrayList<>();
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

	@Override
	public void insertPhoto(String memberUid, long reservationSeq, MultipartFile multipartFile) {
		Reservation reservation = reservationRepository.findByReservationSeq(reservationSeq).orElseThrow(() -> new InvalidReservationSeqException("예약 내역이 존재하지 않습니다."));
		if (!memberUid.equals(reservation.getMember().getMemberUid())) throw new ReservationSeqNotGrantedException("잘못된 접근입니다.");
        int fileCount;
        try {
			fileCount = reservationPhotoRepository.findTop1ByReservationOrderByFileNameDesc(reservation).orElseThrow(() ->
					new RuntimeException("")).getFileName();
        } catch (RuntimeException e) {
            fileCount = 0;
        }
        fileCount++;

        String file = multipartFile.getOriginalFilename();
        if (file == null || multipartFile.getContentType() == null || Arrays.stream(ALLOWED_IMAGE_MIMES).noneMatch(multipartFile.getContentType()::equals)) {
            throw new InvalidFileException("잘못된 파일 입력입니다.");
        }
        File newFile = new File(IMAGE_PATH + reservationSeq + "/" + fileCount + "." + file.substring(file.lastIndexOf(".") + 1));
		try {
			multipartFile.transferTo(newFile);
		} catch (IOException e) {
			throw new FileNotWritableException("파일을 업로드하는 과정에서 오류가 발생했습니다.");
		}
		String photoUrl = IMAGE_URL_PREFIX + reservationSeq + "/" + newFile.getName();
		ReservationPhoto reservationPhoto = ReservationPhoto.builder()
				.fileName(Integer.parseInt(newFile.getName()))
				.photoUrl(photoUrl)
				.reservation(reservation)
				.build();
		reservationPhotoRepository.save(reservationPhoto);
	}
}
