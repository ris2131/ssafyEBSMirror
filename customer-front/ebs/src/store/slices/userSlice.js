import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    User_name : '김싸피'

};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsers(state, action) {
            console.log(action.payload);
            state.User_name = action.payload;
        }
    }


});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;