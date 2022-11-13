import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Canceled() {
    const navigate = useNavigate();

    useEffect(() => {
        alert("구독 결제를 취소했습니다.");
        window.localStorage.removeItem('order');
        window.localStorage.removeItem('tid');
        navigate('/');
    }, []);
}