import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Failed() {
    const navigate = useNavigate();

    useEffect(() => {
        Swal.fire({
            icon: "error",
            title: "오류",
            text: "구독 결제에 실패했습니다. 관리자에게 문의해주세요.\n잠시 후 메인페이지로 이동합니다.",
            showConfirmButton: true,
            timer: 3000,
            confirmButtonColor: '#876445',// confrim 버튼 색깔 지정
            iconColor:'#876445'
        });
        window.localStorage.removeItem('order');
        window.localStorage.removeItem('tid');
        navigate('/');
    }, []);
}