import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import ebs_logo from "../../assets/ebs_logo.png"
import { searchByname } from '../../store/slices/businessSlice';
import HairshopSearchComponent from "../../components/hairshop/HairshopSearchComponent";

const Container = styled.div`
    background-color: #DBD7CC;
    height: 100vh;
    background-image: url(${ebs_logo});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
`;

const CustomInput = styled.input`
    display: inline;
    width: 97%;
    border-width: 2px 2px 2px 2px; 
    border-radius: 5px;
    height: 45px;
    margin: 5px 5px 5px 5px;
`;

// const MyButton = styled.button`
//   border: none;
//   border-radius: 10px;
//   color: white;
//   background-color: #42a5f5;
//   padding: 10px;
//   margin-top: 40px;
//   width: 60px;
//   font-size: 14px;
//   cursor: pointer;
// `;
// const SearchButton = styled.button`
//     display: inline;   
//     border-radius: 5px;
//     justify-content: right;
//     width: 21%;
//     border-width: 2px 2px 2px 2px;
//     background-color: #CCC3FD;
//     color: #FFFFFF;
//     height: 45px;
//     margin: 5px 5px 5px 5px;
//     cursor: pointer;
    
// `;

// const onChangeSearch = (e) => {
//     e.preventDefault();
//     setSearch(e.target.value);
// };


const HairshopSearch = () => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const params = { search_keyword : keyword }
    const hairshopList = useSelector((state) => state.business.hairshopList)
    const submitKeyword = () => {

        dispatch(searchByname(params))

        };
  
    const onKeyPress=(e)=>{
      if(e.key==='Enter'){
        submitKeyword();
      }
    }
    return (
        <Container>
            <div>
                <CustomInput type="text" onKeyPress={onKeyPress} placeholder="헤어숍 이름을 검색하세요."  value={keyword} onChange={(e) => setKeyword(e.target.value)} /> 
                   
                {/* <MyButton onClick={submitKeyword}>
                    검색
                </MyButton> */}
                <div>
                {hairshopList.length !== 0  ? (
            
                 hairshopList.map((a, i) => {
              return (
                <HairshopSearchComponent
                  hairshop={hairshopList[i]}
                  num={i}
                  key={i}
                />
              );
            })
          ) : (
            <>검색 결과가 없습니다.</>
          )}

                </div>
            </div>
        </Container>
    );
};

export default HairshopSearch;

// const HairshopSearch = () => {
//     return (
//         <Container>
//             <form onSubmit={e => onSearch(e)}>
//                 <CustomInput type="text" value={search} placeholder="매장 이름으로 검색하세요." onChange={onChangeSearch} />    
//                 <SearchButton type='submit'>
//                     검색
//                 </SearchButton>
//             </form>
//         </Container>
//     );
// };

// export default HairshopSearch;