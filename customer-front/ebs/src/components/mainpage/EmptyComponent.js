import React from 'react';
import styled from "styled-components";


const Empty = styled.div`
    margin-top: 200px;
    font-family: GowunBatang-Regular;
    
`;

const EmptyComponent = () => {
    return (
        <Empty>
            현재 구독중인 헤어숍이 없습니다. 
        </Empty>
    );
};

export default EmptyComponent;