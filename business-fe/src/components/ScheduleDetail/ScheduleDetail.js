import styled from "styled-components";

const DetailSection = styled.section`
  height: 500px;
  width: 300px;
  background-color: #ffffff;
  box-shadow: #7f7f7f 5px 5px 5px;
  font-size: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TitleDiv = styled.div`
  font-size: 32px;
`;

const DetailDiv = styled.div`
  
`;

const DescriptionDiv = styled.div`
  list-style: georgian outside url('../../assets/scissors_icon.png');
`;

const ScheduleDetail = (detail) => {
  console.log(detail);

  return (
    <DetailSection id='detail'>
      <TitleDiv>예약 상세 내용</TitleDiv>
      <DetailDiv>{detail["member_nickname"]} 고객님</DetailDiv>
      <DetailDiv>
        스타일 요청사항
        <DescriptionDiv>{detail["reservation_style"]}</DescriptionDiv>
      </DetailDiv>
      <DetailDiv>
        서비스 요청사항
        <DescriptionDiv>{detail["reservation_service"]}</DescriptionDiv>
      </DetailDiv>
      <DetailDiv>
        기타 요청사항
        <DescriptionDiv>{detail["reservation_etc"]}</DescriptionDiv>
      </DetailDiv>
    </DetailSection>
  );
}
export default ScheduleDetail;