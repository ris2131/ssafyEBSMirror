package com.ssafyebs.businessbe.domain.manage.dto.responseDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleResponseDto {
    private long reservationSeq;
    private long designerSeq;
    private String name;
    private String photo;
    private String time;
}
