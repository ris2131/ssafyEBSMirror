// import React from "react";

import NavBar from "../../components/Navbar/NavBar";

import styled from "styled-components";

import manageImg from "../../assets/manage.jpg";
import designerImg from "../../assets/designer.jpg";
import scheduleImg from "../../assets/schedule.jpg";

const SMain = styled.main`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;



const SSection = styled.section`
  width: 33%;
  align-items: center;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position-x: center;
  color: #ffffff;
  display: flex;
  filter: brightness(0.5);
  font-size: 3rem;
  font-weight: 700;
  justify-content: center;
  text-shadow: 0.1em 0.1em 0.1em #000000;
  transition-duration: 100ms;
  user-select: none;

  &:not(:last-child):not(:first-child) {
    width: 34%;
  }

  &.manage {
    background-image: url(${manageImg});
  }

  &.designer {
    background-image: url(${designerImg});
    background-position-x: right;
  }

  &.schedule {
    background-image: url(${scheduleImg});
  }

  &:hover {
    width: 45%;
    filter: brightness(1);
    transition-duration: 100ms;
    z-index: 1;
  }
`;

const Business = () => {
  let scheduleStr = "예약 정보";


  // console.log(getVisible);
  // console.log(authSlice(isVisible()));
  // if (!authSlice().isVisible) {
  //   scheduleStr = "매장 등록";
  // }

  return (
    <>
      <NavBar></NavBar>
      <SMain>
        <SSection className={"manage"}>
          <div>매장 관리</div>
        </SSection>
        <SSection className={"designer"}>
          <div>디자이너 관리</div>
        </SSection>
        <SSection className={"schedule"}>
          <div>{scheduleStr}</div>
        </SSection>
      </SMain>
    </>
  );
}

export default Business;