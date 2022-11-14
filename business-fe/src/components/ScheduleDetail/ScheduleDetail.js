import styled from "styled-components";
import {useSelector} from "react-redux";

const DetailSection = styled.section`
  height: 400px;
  width: 300px;
  background-color: #ffffff;
  box-shadow: #7f7f7f 10px 10px 5px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  justify-content: center;
  align-items: start;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: start;
  transform: translate(-50%, -50%);
`;

const TitleDiv = styled.div`
  width: 100%;
  font-size: 24px;
  position: absolute;
  top: 50px;
  left: 50%;
  text-align: center;
  transform: translateX(-50%);
`;

const DetailDiv = styled.div`
  margin-left: 30px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const ContentLi = styled.li`
  list-style-type: "\\2702";
  list-style-position: inside;
`;

const DescriptionDiv = styled.div`
  text-indent: 20px;
`;

const ScheduleDetail = () => {
  const detail = useSelector((state) => state.schedule.reservationDetail);

  return (
    <DetailSection id='detail'>
      <TitleDiv>예약 상세 내용</TitleDiv>
      <DetailDiv>{detail["member_nickname"]} 고객님</DetailDiv>
      <DetailDiv>
        <ContentLi> 스타일 요청사항</ContentLi>
        <DescriptionDiv>{detail["reservation_style"]}</DescriptionDiv>
      </DetailDiv>
      <DetailDiv>
        <ContentLi> 서비스 요청사항</ContentLi>
        <DescriptionDiv>{detail["reservation_service"]}</DescriptionDiv>
      </DetailDiv>
      <DetailDiv>
        <ContentLi> 기타 요청사항</ContentLi>
        <DescriptionDiv>{detail["reservation_etc"]}</DescriptionDiv>
      </DetailDiv>
    </DetailSection>
  );
}
export default ScheduleDetail;