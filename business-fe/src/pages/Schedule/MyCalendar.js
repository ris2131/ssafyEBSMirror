

import styled from "styled-components";

//배경화면이미지
import backgroundImage from "../../assets/calendar_background.png";
//달력 컴포넌트
import CalendarComponent from "../../components/SchedulePage/CalendarComponent";
import NavBar from "../../components/Navbar/NavBar";

const CalendarMain = styled.main`
  
  background: url(${backgroundImage});
  background-size: cover;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 100px;
`;

const CalendarInput = styled.section`
  background-color: #DCD7C9;
  width: 60%;
  border-radius : 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 50px;
`;
const FlexInput = styled.div`
  display: flex;
  text-align: right;
`;

const MyCalendar = () => {

  return(
    <>
      <NavBar></NavBar>
      <CalendarMain>
        <CalendarInput>
          <FlexInput>예약 캘린더</FlexInput>
          <CalendarComponent></CalendarComponent>
        </CalendarInput>
      </CalendarMain>
    </>
  );
};

export default MyCalendar;
