import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Canceled() {
    const navigate = useNavigate();

    useEffect(() => {
        Swal.fire({
            icon: "info",
            title: "취소",
            text: "구독결제를 취소했습니다.\n잠시 후 메인페이지로 이동합니다.",
            showConfirmButton: false,
            timer: 3000
          });
        window.localStorage.removeItem('order');
        window.localStorage.removeItem('tid');
        navigate('/');
    }, []);
}