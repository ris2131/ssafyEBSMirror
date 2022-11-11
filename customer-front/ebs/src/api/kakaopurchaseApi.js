import kakaoaxios from "./kakaoindex";
export const kakaopurchaseApi ={
    purchase:(data) => kakaoaxios.post("https://kapi.kakao.com/v1/payment/ready",data)
};