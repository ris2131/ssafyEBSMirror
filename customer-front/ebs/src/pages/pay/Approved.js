import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getitemseq } from "../../store/slices/subscribeSlice";
import axios from "axios";

export default function Approved(){
    const itemseq = useSelector((state)=>state.subscribe.itemseq);
   
    console.log(window.location.search);
    console.log(itemseq);
}