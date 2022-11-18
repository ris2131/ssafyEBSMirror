import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { getitemlist } from "../../store/slices/subscribeSlice";
import SubscribeItemComponent from './SubscribeItemComponent';

const Container = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(1, minmax(0, 1fr));
`;

const SubscribeComponent = () => {
  const dispatch = useDispatch();
  const itemlist = useSelector((state) => state.subscribe.itemlist);
  const businessSeq = useSelector((state) => state.business.hairshop.businessSeq);
  useEffect(() => {
    dispatch(getitemlist(businessSeq));
    console.log(itemlist);
  }, []);
    return (
        <Container>
            {itemlist.length === 0 ? (
               <>등록된 상품이 없습니다.</> 
            ) : (
                itemlist.map((a,i)=>{
                    return(
                    <SubscribeItemComponent
                    item={itemlist[i]}
                    num={i}
                    key={i}
                    />
                    );
                })
            )}
        </Container>
    );
};

export default SubscribeComponent;