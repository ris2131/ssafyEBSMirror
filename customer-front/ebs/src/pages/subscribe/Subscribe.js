import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
const MyButton = styled.button`
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #42a5f5;
  padding: 10px;
  margin-top: 40px;
  width: 60px;
  font-size: 14px;
  cursor: pointer;
`;
const Subscribe = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const item = location.state.item;
    const data = {
        businessSeq : item.businessSeq
    }

    const subseq = {
        pricingSeq : item.pricingSeq
    }

    
    const trypurchase=()=>{
        const params = {
            cid : "TCSUBSCRIP",
            partner_order_id : "order"+item.pricingSeq,
            partner_user_id : "testuserid",
            item_name : item.hairshopName+" 구독권 "+item.pricingSeq,
            quantity : 1,
            total_amount : item.pricingPrice,
            tax_free_amount : 0,
            approval_url : "https://www.ssafy-ebs.com/pay/approved/",
            cancel_url : "https://www.ssafy-ebs.com/pay/canceled/",
            fail_url : "https://www.ssafy-ebs.com/pay/failed/"
        }
        axios({
            url: "https://kapi.kakao.com/v1/payment/ready",
            method : "POST",
            headers : {
                Authorization : "KakaoAK d08fb758ac87e7487a96eb2cf1bd4b5e",
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            params,
        }).then((res)=>{
            //window.location.assign(res.data.next_redirect_pc_url)
            window.localStorage.setItem('tid', res.data.tid);
            window.localStorage.setItem('order', JSON.stringify(params));
            //ios는 app_url 잘되는데 안드로이드는 안된다...
            isMobile ?window.location.assign(res.data.next_redirect_mobile_url) : window.location.assign(res.data.next_redirect_pc_url);
        })
        

    }

    const move = () =>{
        navigate('/hairshop-info', {state:{...data}});
    };

    // 구독하기 누르는 순간 postSubscribe안에든 밖에든 카카오 결제가 들어가면 된다.
    return (
        <div>
            <div>상품번호{item.pricingSeq}번을 {item.pricingPrice}원에 구독하시겠습니까?</div>
            <MyButton onClick={trypurchase}>구독하기</MyButton>
            <MyButton onClick={move}>취소</MyButton>
        </div>
    )
}
export default Subscribe;