import React from 'react';
import styled from "styled-components";

const Empty = styled.div`
    margin-top: 200px;
    font-family: GowunBatang-Regular;
    
`;

const ReservationEmpty = () => {
    return (
        <Empty>
            예약 내역이 없습니다.
        </Empty>
    );
};

export default ReservationEmpty;