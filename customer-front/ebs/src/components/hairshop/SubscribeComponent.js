import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getitemlist } from "../../store/slices/subscribeSlice";

const SubscribeComponent = () => {
    const itemlist = useSelector((state) => state.subscribe.itemlist);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getitemlist());
  }, []);
    return (
        <div>
            구독
        </div>
    );
};

export default SubscribeComponent;