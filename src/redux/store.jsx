import { configureStore } from "@reduxjs/toolkit";
import walletSlice from "./slices/walletSlice";
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
    rechargeSlice: rechargeSlice,
    commonSlice: commonSlice,
    fastagSlice: fastagSlice,
    electricitySlice: electricitySlice,
    servicesSlice: servicesSlice,
    LpgGasSlice: LpgGasSlice,
    walletSlice: walletSlice,
  },
});

export default store;
