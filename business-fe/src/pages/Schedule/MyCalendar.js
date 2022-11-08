

import styled from "styled-components";
// 달력
// import { format, addMonths, subMonths } from "date-fns";
// import DaySection from "./DaySection";
// import DayItems from "./DayItems";

//달력 컴포넌트
import CalendarComponent from "../../components/SchedulePage/CalendarComponent";


const MyCalendar = () => {

  return(
    <>
      마이캘린더 페이지
      <CalendarComponent></CalendarComponent>
    </>
  );
};

export default MyCalendar;
