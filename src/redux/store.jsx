import { configureStore } from "@reduxjs/toolkit";
import bannerSlice from "./slices/bannerSlice";
import cartSlice from "./slices/shopping/cartSlice";
import coreSlice from "./slices/coreSlice";
import dealsSlice from "./slices/dealsSlice";
import onlineStoreSlice from "./slices/onlineStoreSlice";
import pincodeSlice from "./slices/pincodeSlice";
import primeUserSlice from "./slices/primeUserSlice";
import quickModalSlice from "./slices/quickModalSlice";
import walletSlice from "./slices/payment/walletSlice";
import productSlice from "./slices/shopping/productSlice";
import wishlistSlice from "./slices/shopping/wishlistSlice";
import orderSlice from "./slices/shopping/orderSlice";
import publicSlice from "./slices/public/publicSlice";
import loginSlice from "./slices/profile/loginSlice";
import signUpSlice from "./slices/profile/signUpSlice";
import profileSlice from "./slices/profile/profileSlice";
import digiGoldSlice from "./slices/digiGold/digiGoldSlice";
import registerDigiSlice from "./slices/digiGold/registerDigiSlice";
import userProfileSlice from "./slices/digiGold/userProfileSlice";

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
    profileSlice: profileSlice,
    publicSlice: publicSlice,
    digiGoldSlice: digiGoldSlice,
    registerDigiSlice: registerDigiSlice,
    userProfileSlice: userProfileSlice,
    // paymentSlice: paymentSlice,
  },
});

export default store;
