import { configureStore } from "@reduxjs/toolkit";
import chatBotSlice from "./feature/chatbot";

export default configureStore({
    reducer: {
        "chat": chatBotSlice
    }

})