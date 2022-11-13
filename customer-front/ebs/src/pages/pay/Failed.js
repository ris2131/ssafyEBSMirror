import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Failed() {
    const navigate = useNavigate();

    useEffect(() => {
        alert("구독 결제에 실패했습니다.");
        window.localStorage.removeItem('order');
        window.localStorage.removeItem('tid');
        navigate('/');
    }, []);
}