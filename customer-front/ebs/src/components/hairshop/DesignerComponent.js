import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDesignerInfo } from "../../store/slices/businessSlice"
import { useEffect } from "react";

const DesignerComponent = () => {
    const dispatch = useDispatch();

    const name = useSelector((state) => state.business.designer.name);
    const description = useSelector((state) => state.business.designer.description);
    const businessSeq = useSelector((state) => state.business.hairshop.businessSeq);
    
    useEffect(() => {
        dispatch(getDesignerInfo(businessSeq))
    }, []);

    return (
        <div>
            디자이너 홈
            <div>
                이름 : {name}    
            </div>
            <div>
                설명 : {description}
            </div>

        </div>
    );
};

export default DesignerComponent;