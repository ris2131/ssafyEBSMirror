import React from 'react';
import styled from "styled-components";

const Empty = styled.div`
    margin-top: 200px;
    font-family: GowunBatang-Regular;
    
`;

const SubscribeEmpty = () => {
    return (
        <Empty>
            구독 내역이 없습니다.
        </Empty>
    );
};

export default SubscribeEmpty;