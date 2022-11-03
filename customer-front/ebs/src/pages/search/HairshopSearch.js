import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    background-color: #F9F9F9;
    height: 100vh;
`;

const CustomInput = styled.input`
    display: inline;
    width: 70%;
    border-width: 2px 2px 2px 2px; 
    border-radius: 5px;
    height: 45px;
    margin: 5px 5px 5px 5px;
`;

const SearchButton = styled.button`
    display: inline;   
    border-radius: 5px;
    justify-content: right;
    width: 23%;
    border-width: 2px 2px 2px 2px;
    background-color: #CCC3FD;
    color: #FFFFFF;
    height: 45px;
    margin: 5px 5px 5px 5px;
    


    
`;

// const onChangeSearch = (e) => {
//     e.preventDefault();
//     setSearch(e.target.value);
// };

const HairshopSearch = () => {
    return (
        <Container>
            <form >
                <CustomInput />    
                <SearchButton>
                    검색
                </SearchButton>
            </form>
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