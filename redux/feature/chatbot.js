import { createSlice } from "@reduxjs/toolkit";
const  initialState ={
    loading : false,
    message : [],
    err : null
}
const chatBotSlice = createSlice({
    name:"chat",
    initialState ,
    reducers : {
        chatbegin : (state)=>{
            state.loading = true
            state.err = null
        },
        chatend : (state,action) => {
            state.loading = false
            state.message = action.payload
        },
        chaterr : (state,action) => {
            state.loading = false
            state.err = action.payload
        }
    }
})
export const{chatbegin , chatend , chaterr} = chatBotSlice.actions
export default chatBotSlice.reducer