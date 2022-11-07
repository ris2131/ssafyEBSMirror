import Modal from "@mui/material/Modal";
import { Button, Container } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HorizonLine from '../../components/mypage/HorizonLine';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getuser, quituser } from "../../store/slices/userSlice";
import MyButton from '../../components/MyButton';
import styled from "styled-components";
import ReservationcardComponent from "../../components/mypage/ReservationcardComponent";
import SubscribecardComponent from "../../components/mypage/SubscribecardComponent";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #ececec",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

const InfoContainer = styled.div`
  background-color: #BEB2A7;
  
`;

const Title = styled.div`
  font-size: 50px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
  color: #FFFFFF;
`;

const Nicknamecontainer = styled.div`
  text-align: justify;
  
`;

const Nickname = styled.div`
  display: inline;
  margin-left: 10px;
  color: #FFFFFF;
`;

const Realname = styled.div`
  display: inline;
  margin-left: 20px;
  color: #FFFFFF;
  
`;

const AdressContainer = styled.div`
  text-align: justify;
  color: #FFFFFF;
`;

const AdressTitle = styled.div`
  display: inline;
  margin-left: 10px;
  
`;

const Adress = styled.div`
  display: inline;
  margin-left: 20px;
  
`;


const Mypage = () => {

    const nickName = useSelector((state) => state.user.member.nickname)
    const address = useSelector((state) => state.user.member.address)
    const businessSeq = useSelector((state) => state.business.hairshop.businessSeq);
    console.log(businessSeq)
    const title = "탈퇴 확인";
    const description = "정말 우리 서비스 탈퇴하실건가요?ㅠ.ㅠ";
    const data = {
        nickname : nickName,
        address : address, 
    } 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
       dispatch(getuser())
    }, []);

    const handleEdit = () => {
        navigate("/myinfo-edit", { state: { ...data } })
    }
    const handleQuit = () => {
        dispatch(quituser())
        .unwrap()
        .then((res) => {console.log(res); alert("탈퇴 완료!"); navigate("/")})
        .catch((err) => console.error(err));
    }

    const BasicModal = ({ title, description }) => {
        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
    
        return (
          <div>
            <div onClick={handleOpen}>탈퇴하기</div>
    
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {description}
                </Typography>
    
                <div>
                  <MyButton
                    onClick={handleQuit}
                    width={"200px"}
                    padding={"5px"}
                    margin={"30px 10px"}
                    text={"네 탈퇴할게요!"}
                  />
    
                  <MyButton
                    onClick={handleClose}
                    width={"200px"}
                    padding={"5px"}
                    margin={"30px 10px"}
                    text={"좀 더 생각 해 볼게요!"}
                  />
                </div>
              </Box>
            </Modal>
          </div>
        );
      };



    return (
        <InfoContainer>
                <Title>
                    마이페이지
                </Title>
                <Nicknamecontainer>
                  <Nickname>
                      닉네임  
                  </Nickname>
                  <Realname>
                      {nickName}
                  </Realname>
                </Nicknamecontainer>
                <HorizonLine />
                <AdressContainer>
                  <AdressTitle>
                      주소  
                  </AdressTitle>
                  <Adress>
                      {address}
                  </Adress>
                </AdressContainer>
                <HorizonLine/>

              <ReservationcardComponent/>
              <SubscribecardComponent/>

            
        
            <div>
            <Button variant="outlined" color="primary" onClick={handleEdit}>
            수정하기
            </Button>
            <Button variant="outlined" color="primary">
              <BasicModal title={title} description={description} />
            </Button>
            </div>
            
        </InfoContainer>
    );
};

export default Mypage;