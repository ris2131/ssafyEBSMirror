import GoogleLogin from "./GoogleLogin";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../store/slices/userSlice";
import React from 'react';
import { useNavigate } from "react-router-dom";


const GoogleTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onGoogleSignIn = async (res) => {
    const { credential } = res;
    console.log(credential);
    const data = {
      id_token: credential,
      memberLoginType : 'G',
    };

    dispatch(googleLogin(data))
      .unwrap()
      .then((res) => {
        console.log(res);
        console.log(res.data)
        res.status === "SUCCESS"

          ? res.data
            ? navigate("/")
            : navigate("/googleintro", { state: { ...data } })
          : console.log("bye");
      })
      .catch((err) => console.error(err));

    // 여기서 status로 1차거르고 data보고 null이면 navigate intro 해서 처리하고 null 아니면 ㄱㄱ
  };
  return <GoogleLogin onGoogleSignIn={onGoogleSignIn} />;
};

export default GoogleTest;