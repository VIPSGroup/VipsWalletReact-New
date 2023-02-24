import { configureStore } from "@reduxjs/toolkit";
import bannerSlice from "./slices/bannerSlice";
import dealsSlice from "./slices/dealsSlice";
import onlineStoreSlice from "./slices/onlineStoreSlice";
import pincodeSlice from "./slices/pincodeSlice";
import primeUserSlice from "./slices/primeUserSlice";
import productSlice from "./slices/productSlice";
import quickModalSlice from "./slices/quickModalSlice";
// import loginSlice from "./slices/loginSlice";

const store = configureStore({
  reducer: {
    // loginSlice: loginSlice,
    bannerSlice: bannerSlice,
    productSlice: productSlice,
    pincodeSlice: pincodeSlice,
    onlineStoreSlice: onlineStoreSlice,
    primeUserSlice: primeUserSlice,
    dealsSlice: dealsSlice,
    signUpSlice:signUpSlice
    quickModalSlice: quickModalSlice,
  },
});

export default store;
