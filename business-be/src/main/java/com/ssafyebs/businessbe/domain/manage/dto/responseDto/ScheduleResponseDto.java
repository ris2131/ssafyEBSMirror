package com.ssafyebs.businessbe.domain.manage.dto.responseDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleResponseDto {
    @JsonProperty("reservation_seq")
    private long reservationSeq;
    @JsonProperty("designer_seq")
    private long designerSeq;
    private String name;
    private String photo;
    private String time;
}
