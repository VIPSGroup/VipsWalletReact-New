import { configureStore } from "@reduxjs/toolkit";
import bannerSlice from "./slices/bannerSlice";
import cartSlice from "./slices/shopping/cartSlice";
import coreSlice from "./slices/coreSlice";
import dealsSlice from "./slices/dealsSlice";
import onlineStoreSlice from "./slices/onlineStoreSlice";
import pincodeSlice from "./slices/pincodeSlice";
import primeUserSlice from "./slices/primeUserSlice";
import quickModalSlice from "./slices/quickModalSlice";
import rechargeSlice from "./slices/services/rechargeSlice";
import commonSlice from "./slices/services/commonSlice";
import fastagSlice from "./slices/services/fastagSlice";
import electricitySlice from "./slices/services/electricitySlice";
import servicesSlice from "./slices/services/servicesSlice";
import LpgGasSlice from "./slices/services/LpgGasSlice";
import signUpSlice from "./slices/profile/signUpSlice";
import productSlice from "./slices/shopping/productSlice";
import loginSlice from "./slices/profile/loginSlice";
import wishlistSlice from "./slices/shopping/wishlistSlice";

import publicSlice from "./slices/public/publicSlice";
import orderSlice from "./slices/shopping/orderSlice";
import profileSlice from "./slices/profile/profileSlice";

import digiGoldSlice from "./slices/digiGold/digiGoldSlice";
import userProfileSlice from "./slices/digiGold/userProfileSlice";
import registerDigiSlice from "./slices/digiGold/registerDigiSlice";
import walletSlice from "./slices/payment/walletSlice";


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
    publicSlice: publicSlice,
    quickModalSlice: quickModalSlice,
    wishlistSlice: wishlistSlice,
    cartSlice: cartSlice,
    rechargeSlice: rechargeSlice,
    commonSlice: commonSlice,
    fastagSlice: fastagSlice,
    electricitySlice: electricitySlice,
    servicesSlice: servicesSlice,
    LpgGasSlice: LpgGasSlice,
    walletSlice: walletSlice,
    orderSlice:orderSlice,
    profileSlice:profileSlice,
    registerDigiSlice: registerDigiSlice,
    digiGoldSlice: digiGoldSlice,
    userProfileSlice: userProfileSlice,
    publicSlice: publicSlice,

  },
});

export default store;
