import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getitemseq } from "../../store/slices/subscribeSlice";
import axios from "axios";

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export default function Approved(){
    console.log(window.location.search);
}