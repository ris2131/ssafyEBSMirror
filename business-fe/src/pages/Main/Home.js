import '../../App.css';

import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";

import NavBar from "../../components/Navbar/NavBar";
import manageImg from "../../assets/manage.jpg";
import designerImg from "../../assets/designer.jpg";
import scheduleImg from "../../assets/schedule.jpg";
import registrationImg from "../../assets/schedule.jpg";

import {registerinfo} from "../../redux/InfoSlice";

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

  &.registration {
    background-image: url(${registrationImg});
  }

  &:hover {
    width: 45%;
    filter: brightness(1);
    transition-duration: 100ms;
    z-index: 1;
  }
`;
const Home = () => {
  let scheduleStr = "예약 정보";
  let registrationStr = "매장등록하기";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isVisible = useSelector((state) => state.auth.isVisible);
  useEffect(() => {

    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Ebs`;
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    console.log("useeffect isvisible 은" + isVisible);

  }, [isLoggedIn, isVisible, navigate]);

  //매장 관리 페이지 ㄱ
  const handleInfo = () => {
    navigate("/info");
  };
  //디자이너 페이지 ㄱ
  const handleDesigner = () => {
    navigate("/designer");
  }
  //등록.
  const handleRegistration = () => {
    dispatch(registerinfo())
      .unwrap()
      .then(() => {
        Swal.fire({icon: "success", title: "매장이 등록되었습니다"})
          .then(() => {
            window.location.reload()
          });
      })
      .catch(() => {
        Swal.fire({icon: "error", title: "필수 정보가 제대로 기입 되지 않았습니다."})
      });

  }
  //예약관리 페이지(캘린더)ㄱ
  const handleCalendar = () => {
    navigate("/schedule/my-calendar");
  }

  return (
    <>
      <NavBar></NavBar>
      <SMain>
        <SSection className={"manage"} onClick={handleInfo}>
          <div>매장 관리</div>
        </SSection>
        <SSection className={"designer"} onClick={handleDesigner}>
          <div>디자이너 관리</div>
        </SSection>
        {isVisible ? (
          // 예약정보
          <SSection className={"schedule"} onClick={handleCalendar}>
            <div>{scheduleStr}</div>
          </SSection>
        ) : (
          //등록하기
          <SSection className={"registration"} onClick={handleRegistration}>
            <div>{registrationStr}</div>
          </SSection>
        )}
      </SMain>
    </>
  );
};

export default Home;