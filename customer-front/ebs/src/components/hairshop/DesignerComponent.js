import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { getDesignerInfo } from "../../store/slices/businessSlice"
import { useEffect } from "react";
import DesignerListComponent from './DesignerListComponent';


const Container = styled.div`
    background-color: #F9F9F9;
    // height: 100vh;
    flex: 1;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
`;




const DesignerComponent = () => {
    const dispatch = useDispatch();

    const designerList = useSelector((state) => state.business.designerList);
    const businessSeq = useSelector((state) => state.business.hairshop.businessSeq);


    useEffect(() => {
        dispatch(getDesignerInfo(businessSeq))
    }, []);
    return (
        <Container>
        
            
            {designerList.length != 0 ? (
        
            designerList.map((a, i) => {
          return (
            <DesignerListComponent
              designer={designerList[i]}
              num={i}
              key={i}
            />
          );
        })
      ) : (
        <>등록된 디자이너가 없습니다.</>
      )}


        
    </Container>

    );
};

export default DesignerComponent;