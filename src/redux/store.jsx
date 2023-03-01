import { configureStore } from "@reduxjs/toolkit";
import bannerSlice from "./slices/bannerSlice";
import cartSlice from "./slices/cartSlice";
import coreSlice from "./slices/coreSlice";
import dealsSlice from "./slices/dealsSlice";
import loginSlice from "./slices/loginSlice";
import onlineStoreSlice from "./slices/onlineStoreSlice";
import orderSlice from "./slices/orderSlice";
import pincodeSlice from "./slices/pincodeSlice";
import primeUserSlice from "./slices/primeUserSlice";
import productSlice from "./slices/productSlice";
import quickModalSlice from "./slices/quickModalSlice";
import signUpSlice from "./slices/signUpSlice";
import walletSlice from "./slices/walletSlice";
import wishlistSlice from "./slices/wishlistSlice";
// import loginSlice from "./slices/loginSlice";

const store = configureStore({
  reducer: {
    loginSlice: loginSlice,
    bannerSlice: bannerSlice,
    productSlice: productSlice,
    pincodeSlice: pincodeSlice,
    onlineStoreSlice: onlineStoreSlice,
    primeUserSlice: primeUserSlice,
    dealsSlice: dealsSlice,
    signUpSlice: signUpSlice,
    quickModalSlice: quickModalSlice,
    wishlistSlice: wishlistSlice,
    cartSlice: cartSlice,
    walletSlice: walletSlice,
    orderSlice: orderSlice,
    coreSlice: coreSlice,
  },
});

export default store;
