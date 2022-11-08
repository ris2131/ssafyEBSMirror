import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from 'react-bootstrap/Card'
import Typography from "@mui/material/Typography";
import HorizonLine from '../../components/mypage/HorizonLine';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getuser, quituser } from "../../store/slices/userSlice";
import MyButton from '../../components/MyButton';

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
        <div>
            <div>
                <h1>
                    마이페이지
                </h1>
            </div>
            <div>
                <span>
                    닉네임 : 
                </span>
                <span>
                    {nickName}
                </span>
                <HorizonLine />
            </div>
            <div>
                <span>
                    주소 : 
                </span>
                <span>
                    {address}
                </span>
                <HorizonLine/>
            </div>
            <div>
                <Card>
                    <Card.Body>구독 정보</Card.Body>
                </Card>
            </div>
            <div>
                <Card>
                    <Card.Body>예약 내역</Card.Body>
                </Card>
            </div>
        
            <div>
            <Button variant="outlined" color="primary" onClick={handleEdit}>
            수정하기
            </Button>
            <Button variant="outlined" color="primary">
              <BasicModal title={title} description={description} />
            </Button>
            </div>
            
        </div>
    );
};

export default Mypage;