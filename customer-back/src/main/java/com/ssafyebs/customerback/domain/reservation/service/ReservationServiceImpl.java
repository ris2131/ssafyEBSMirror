package com.ssafyebs.customerback.domain.reservation.service;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import com.ssafyebs.customerback.domain.reservation.entity.ReservationPhoto;
import com.ssafyebs.customerback.domain.reservation.projection.ReservationPhotoUrl;
import com.ssafyebs.customerback.domain.reservation.repository.ReservationPhotoRepository;
import com.ssafyebs.customerback.global.exception.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

	final static Logger logger = LoggerFactory.getLogger(ReservationServiceImpl.class);

    @Value("${image-path}")
    String IMAGE_PATH;

    @Value("${image-url}")
    String IMAGE_URL_PREFIX;

	@Override
	public List<ReservationResponseDto> findByMember_MemberUid(String memberUid) {
		// TODO Auto-generated method stub
		List<ReservationResponseDto> list = new ArrayList<>();
		List<Reservation> rlist = reservationRepository.findByMember_MemberUidOrderByReservationDateDesc(memberUid);

		for(Reservation r : rlist) {
			ReservationResponseDto dto = new ReservationResponseDto();
			dto.setReservationSeq(r.getReservationSeq());
			dto.setDesignerName(r.getFederatedReservation().getDesignerName());
			dto.setHairshopName(r.getFederatedReservation().getHairshopName());
			dto.setReservationDate(r.getReservationDate());
			dto.setReservationStyle(r.getReservationStyle());
			dto.setReservationService(r.getReservationService());
			dto.setReservationEtc(r.getReservationEtc());
			dto.setBusinessSeq(r.getFederatedReservation().getBusinessSeq());

			try {
				List<String> urls = reservationPhotoRepository.findByReservationOrderByFileCountDesc(r).orElseThrow(() -> new RuntimeException(""))
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
		if (multipartFile == null || multipartFile.getContentType() == null || Arrays.stream(ALLOWED_IMAGE_MIMES).noneMatch(multipartFile.getContentType()::equals)) {
			throw new InvalidFileException("잘못된 파일 입력입니다.");
		}
		String file = multipartFile.getOriginalFilename();
		if (file == null) throw new InvalidFileException("잘못된 파일 입력입니다.");

		Reservation reservation = reservationRepository.findByReservationSeq(reservationSeq).orElseThrow(() -> new InvalidReservationSeqException("예약 내역이 존재하지 않습니다."));
		if (!memberUid.equals(reservation.getMember().getMemberUid())) throw new AccessNotGrantedException("잘못된 접근입니다.");
        int fileCount;
        try {
			fileCount = reservationPhotoRepository.findTop1ByReservationOrderByFileCountDesc(reservation).orElseThrow(() ->
					new RuntimeException("")).getFileCount();
        } catch (RuntimeException e) {
            fileCount = 0;
			File destDir = new File(IMAGE_PATH + reservationSeq);
			if (!destDir.mkdirs()) logger.warn(LocalDate.now() + " 파일 경로 중복");
        }
        fileCount++;

        File newFile = new File(IMAGE_PATH + reservationSeq + "/" + fileCount + "." + file.substring(file.lastIndexOf(".") + 1));
		try {
			multipartFile.transferTo(newFile);
		} catch (IOException e) {
			throw new FileNotWritableException("파일을 업로드하는 과정에서 오류가 발생했습니다.");
		}
		String newFileName = newFile.getName();
		String photoUrl = IMAGE_URL_PREFIX + reservationSeq + "/" + newFileName;
		ReservationPhoto reservationPhoto = ReservationPhoto.builder()
				.fileCount(Integer.parseInt(newFileName.substring(0, newFileName.lastIndexOf('.'))))
				.photoUrl(photoUrl)
				.reservation(reservation)
				.build();
		reservationPhotoRepository.save(reservationPhoto);
	}

	@Override
	public void deletePhoto(String memberUid, String photoUrl) {
		if (!memberUid.equals(reservationPhotoRepository.findReservationByPhotoUrl(photoUrl)
				.orElseThrow(() -> new NoSuchFileException("잘못된 접근입니다."))
				.getReservation().getMember().getMemberUid())) throw new AccessNotGrantedException("잘못된 접근입니다.");
		if (reservationPhotoRepository.deleteReservationPhotoByPhotoUrl(photoUrl) == 0) throw new NoSuchFileException("존재하지 않는 파일입니다.");
		File file = new File(photoUrl.replace(IMAGE_URL_PREFIX, IMAGE_PATH));
		if (!file.delete()) throw new FileNotWritableException("파일이 삭제되지 않았습니다.");
	}
}
