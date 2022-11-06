// import React from "react";

import '../../App.css';

import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";

const SButton = styled.button`
  @media screen and (max-width: 1000px) {
    width: 50vw;
  }
  border-radius: 5px;
  color: white;
  border: none;
  background-color: #9D7F5C;
  padding: 5px;
  margin-top: 40px;
  width: 10vw;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const Home = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isVisible = useSelector((state) => state.auth.isVisible);
    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `Ebs`;
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [isLoggedIn,isVisible, navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    const handleVisible = () => {
        console.log("isvisible 은"+isVisible);
    };

    return (
        <>
            <div>안녕하세홈화면</div>
            <SButton onClick={logout}>로그아웃</SButton>
            <SButton onClick={handleVisible}>visible 상태 알려줘</SButton>
        </>
    );
};

export default Home;