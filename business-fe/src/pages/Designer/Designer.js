import NavBar from "../../components/Navbar/NavBar";
import styled from "styled-components";

import {getDesigner} from "../../redux/DesignerSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getinfo} from "../../redux/InfoSlice";
import {useNavigate} from "react-router-dom";
import designerImg from "../../assets/designer_background.png";

const DesignerMain = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 100px;
  background: center / cover no-repeat url(${designerImg});
`;

const DesignerSection = styled.section`
  width: 60%;
  flex: 1;
  background-color: #DCD7C9;
  padding: 50px;
  border-radius: 50px;
`;

const HeadDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 30px 10px;
  user-select: none;
`;

const TitleDiv = styled.div`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 60px;
  vertical-align: bottom;
`;

const AddButton = styled.button`
  background-color: #3F4E4F7f;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  box-shadow: #3f3f3f 5px 5px 10px;
  padding: 20px;
  font-size: 16px;
  font-weight: bold;
  transition-duration: 100ms;

  &:hover {
    background-color: #3F4E4F;
    transition-duration: 100ms;
  }
`;

const DesignerDiv = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  background-color: #3F4E4F;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
  margin: 10px 10px 25px 10px;
  box-shadow: #3f3f3f 5px 5px 10px;
`;

const ProfileDiv = styled.div`
  height: 150px;
`;

const ProfileImg = styled.img`
  height: 150px;
  width: auto;
  max-width: 150px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const DescriptionDiv = styled.div`
  margin-left: 50px;
  background-color: #DCD7C9;
  border-radius: 10px;
  height: 150px;
  flex: 1;
  position: relative;
  text-align: left;
`;

const DesignerNameDiv = styled.div`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 24px;
  margin: 10px;
  color: #2E231A;
`;

const DesignerDescDiv = styled.div`
  font-size: 16px;
  margin-left: 10px;
  color: #2E231A;
`;

const EditButton = styled.button`
  width: 100px;
  right: 0;
  top: 0;
  background-color: #3F4E4F7f;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  margin: 10px;
  padding: 10px;
  position: absolute;
  text-align: center;
  transition-duration: 100ms;
  //display: none !important;

  &:hover {
    background-color: #3F4E4F;
    transition-duration: 100ms;
  }
`;

const Designer = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDesigner());
    dispatch(getinfo());
  }, [dispatch]);

  const hairshopName = useSelector((state) => state.info.profile["name"]);
  const designerList = useSelector((state) => state.designer.designers);

  const addDesigner = () => {
    navigate("/designer/add");
  };
  const handleEdit = (designer_seq) => {
    navigate("/designer/modify", {state: designer_seq});
  }
  return (
    <>
      <NavBar></NavBar>
      <DesignerMain>
        <DesignerSection>
          <HeadDiv>
            <TitleDiv>{hairshopName}의 디자이너</TitleDiv>
            <AddButton onClick={addDesigner}>디자이너 추가</AddButton>
          </HeadDiv>
          {
            designerList.length ? (
              designerList.map((designer) => {
                return (
                  <DesignerDiv key={designer["designer_seq"]}>
                    <ProfileDiv>
                      <ProfileImg src={designer["photo"]}></ProfileImg>
                    </ProfileDiv>
                    <DescriptionDiv>
                      <DesignerNameDiv>{designer["name"]}</DesignerNameDiv>
                      <DesignerDescDiv>{designer["description"]}</DesignerDescDiv>
                      <EditButton value={designer["designer_seq"]}
                                  onClick={(e) => handleEdit(e.target.value)}>편집</EditButton>
                    </DescriptionDiv>
                  </DesignerDiv>
                );
              })
            ) : <div>등록된 디자이너가 없습니다.</div>
          }
        </DesignerSection>
      </DesignerMain>
    </>
  );
}

export default Designer;