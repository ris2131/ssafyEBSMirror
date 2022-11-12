package com.ssafyebs.businessbe.domain.manage.dto.responseDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DetailResponseDto {
    @JsonProperty("member_nickname")
    String memberNickname;
    @JsonProperty("reservation_style")
    String reservationStyle;
    @JsonProperty("reservation_service")
    String reservationService;
    @JsonProperty("reservation_etc")
    String reservationEtc;
}
