

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
  justify-content: start;
  align-items: center;
  flex: 1;
  padding: 50px;
`;

const TitleDiv = styled.div`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 60px;
  margin: 30px 0px;

`;
const MyCalendar = () => {

  return(
    <>
      <NavBar></NavBar>
      <CalendarMain>
        <CalendarInput>
          <TitleDiv> 예약 캘린더</TitleDiv>
          <CalendarComponent></CalendarComponent>
        </CalendarInput>
      </CalendarMain>
    </>
  );
};

export default MyCalendar;
