import Modal from "@mui/material/Modal";
import { Button, Container } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HorizonLine from '../../components/HorizonLine';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getuser, quituser } from "../../store/slices/userSlice";
import MyButton from '../../components/MyButton';
import styled from "styled-components";
import ReservationcardComponent from "../../components/mypage/ReservationcardComponent";
import SubscribecardComponent from "../../components/mypage/SubscribecardComponent";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import wood_image from "../../assets/wood_image.jpg";
import Swal from "sweetalert2";

const theme = createTheme({
  palette: {
      brown: {
          main: '#DFD3C3'
      }
  }
});


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
  background-color: #FBF8F1;
  // background-image: url(${wood_image});
  font-family: GowunBatang-Regular;
  flex: 1;
  font-weight: bold;
`;

const Title = styled.div`
  font-size: 50px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
  color: #000000;
`;

const Nicknamecontainer = styled.div`
  text-align: justify;
  
`;

const Nickname = styled.div`
  display: inline;
  margin-left: 10px;
  color: #000000;
`;

const Realname = styled.div`
  display: inline;
  margin-left: 20px;
  color: #000000;
  
`;

const AdressContainer = styled.div`
  text-align: justify;
  color: #000000;
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
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    console.log(businessSeq)
    const title = "탈퇴 확인";
    const description = "정말 EBS를 탈퇴하실건가요?ㅠ.ㅠ";
    const data = {
        nickname : nickName,
        address : address,
        isLoggedIn : isLoggedIn, 
    } 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
       dispatch(getuser())
    }, []);

    const handleEdit = () => {
        navigate("/myinfo-edit", { state: { ...data } })
    }

    const moveSubscription = () => {
      navigate("/subscribe-info", { state: { ...data } })
    };

    const moveReservation = () => {
      navigate("/reservation-info", { state: { ...data } })
    };

    const handleQuit = () => {
        dispatch(quituser())
        .unwrap()
        .then((res) => {
          console.log(res); 
          Swal.fire({
            icon: "success",
            title: "완료",
            text: "회원탈퇴 처리가 완료되었습니다.\n이용해주셔서 감사합니다.",
            showConfirmButton: true,
            confirmButtonColor: '#876445',// confrim 버튼 색깔 지정
            iconColor:'#876445'
          })
          navigate("/")
        })
        .catch((err) => console.error(err));
    }

    const BasicModal = ({ title, description }) => {
        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
    ;

    
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
                    className="confirm"
                    width={"200px"}
                    padding={"5px"}
                    margin={"30px 10px"}
                    text={"네 탈퇴할게요!"}
                    backgroundColor="#A27B5C"
                    fontWeight="bold"

                  />
    
                  <MyButton
                    onClick={handleClose}
                    width={"200px"}
                    padding={"5px"}
                    margin={"30px 10px"}
                    text={"좀 더 생각 해 볼게요!"}
                    color="black"
                    fontWeight="bold"
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
                <div onClick={moveReservation}>
                  <ReservationcardComponent/>
                </div>
                <div onClick={moveSubscription}>
                  <SubscribecardComponent/>
                </div>

            
                <ThemeProvider theme={theme}>
                  <Grid container spacing={5} justifyContent="center" mt={2} >
                    <Grid item>
                      <Button variant="contained" color="brown" sx={{fontWeight: 'bold'}} onClick={handleEdit}>
                      수정하기
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="brown" sx={{fontWeight: 'bold'}} >
                        <BasicModal title={title} description={description} />
                      </Button>
                    </Grid>
                  </Grid>
                </ThemeProvider>
        </InfoContainer>
    );
};

export default Mypage;