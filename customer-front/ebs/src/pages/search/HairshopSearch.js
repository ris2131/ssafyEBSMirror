import axios from 'axios';
import React, { useState } from 'react';
import styled from "styled-components";
import ebs_logo from "../../assets/ebs_logo.png"

const Container = styled.div`
    background-color: #F9F9F9;
    height: 100vh;
    background-image: url(${ebs_logo});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
`;

const CustomInput = styled.input`
    display: inline;
    width: 73%;
    border-width: 2px 2px 2px 2px; 
    border-radius: 5px;
    height: 45px;
    margin: 3px 5px 5px 5px;
`;

const MyButton = styled.button`
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #42a5f5;
  padding: 10px;
  margin-top: 40px;
  width: 60px;
  font-size: 14px;
  cursor: pointer;
`;
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

    const [keyword, setKeyword] = useState("");
    const params = { search_keyword : keyword }
    const submitKeyword = () => {
        
             // const data = {
        //     keyword
        // };
        // console.log(keyword)
        axios.get("http://localhost:8080/search/hairshop",{params} ).then((res)=>(console.log(res))).catch(()=>(console.log("!!!!!")))

                // dispatch(googleNickname(data))
        //   .unwrap()
        //   .then((res) => {console.log(res); navigate("/")})
        //   .catch((err) => console.error(err));
        };
  
    
    return (
        <Container>
            <div>
                <CustomInput type="text" placeholder="헤어숍 이름을 검색하세요." value={keyword} onChange={(e) => setKeyword(e.target.value)}/> 
                   
                <MyButton onClick={submitKeyword}>
                    검색
                </MyButton>
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