import styled from "styled-components";
import {useSelector} from "react-redux";

const DetailSection = styled.section`
  min-height: 400px;
  width: 300px;
  background-color: #ffffff;
  border: #DCD7C9 solid 20px;
  border-radius: 20px;
  box-shadow: #7f7f7f 10px 10px 5px;
  display: flex;
  flex-direction: column;
  font-family: GowunBatang-Regular, sans-serif;
  font-size: 16px;
  justify-content: start;
  align-items: start;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: start;
  transform: translate(-50%, -50%);
`;

const HeadDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  text-align: center;
  margin: 30px 0;
`;

const TitleDiv = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
`;

const CustomerDiv = styled.div`
  width: 100%;
  font-size: 20px;
`;

const RequestDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DetailDiv = styled.div`
  margin-left: 30px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const ContentLi = styled.li`
  list-style-type: "\\2702";
  list-style-position: inside;
  font-weight: bold;
`;

const DescriptionDiv = styled.div`
  text-indent: 24px;
`;

const ScheduleDetail = () => {
  const detail = useSelector((state) => state.schedule.reservationDetail);

  return (
    <DetailSection id='detail'>
      <HeadDiv>
        <TitleDiv>예약 상세 내용</TitleDiv>
        <CustomerDiv>{detail["member_nickname"]} 고객님</CustomerDiv>
      </HeadDiv>
      <RequestDiv>
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
      </RequestDiv>
    </DetailSection>
  );
}
export default ScheduleDetail;