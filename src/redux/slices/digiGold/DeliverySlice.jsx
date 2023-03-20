import { createSlice } from "@reduxjs/toolkit";

const DeliverySlice = createSlice({
  name: "DeliverySlice",
  initialState: {
    cart: {
      data: JSON.parse(localStorage.getItem("digi-cart")) || "",
    },
  },
  reducers: {
    addDigiCart: (state, action) => {
      console.log(action.payload, "chlo theek hai");
      let prevCart = state.cart.data;
      let cartToBe = [];
      //   if (prevCart) {
      //     cartToBe = [...prevCart];
      //     if (cartToBe.find((a) => a.Id !== action.payload.Id)) {
      //         const data = {
      //             item : action.payload
      //         }
      //         cartToBe.push(data);
      //       }
      //   }
    },
    removeCart: (state, action) => {
      state.cartCount = state.cartCount.filter((e) => e.Id !== action.payload);
    },
  },
  extraReducers: {},
});
export const { addDigiCart } = DeliverySlice.actions;
export default DeliverySlice.reducer;
