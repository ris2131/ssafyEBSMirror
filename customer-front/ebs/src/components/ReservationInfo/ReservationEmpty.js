import React from 'react';
import styled from "styled-components";

const Empty = styled.div`
    color: #FFFFFF;
    text-align: center;
    text-align
`;

const ReservationEmpty = () => {
    return (
        <Empty>
            예약 정보가 없습니다.
        </Empty>
    );
};

export default ReservationEmpty;