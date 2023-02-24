import { configureStore } from "@reduxjs/toolkit";
import bannerSlice from "./slices/bannerSlice";
import loginSlice from "./slices/loginSlice";
import signUpSlice from "./slices/signUpSlice";

const store = configureStore({
  reducer: {
    loginSlice: loginSlice,
    bannerSlice: bannerSlice,
    signUpSlice:signUpSlice
  },
});

export default store;