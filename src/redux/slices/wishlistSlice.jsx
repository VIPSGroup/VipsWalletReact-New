import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState: {
    wishCount: JSON.parse(localStorage.getItem("wishlist")),
  },
  reducers: {
    addWish: (state, action) => {
      state.wishCount = action.payload;
    },
    removeWish: (state, action) => {
      console.log(action.payload, "aaa");
      state.wishCount = state.wishCount.filter((e) => e.Id !== action.payload);
    },
  },
});

export const { addWish, removeWish } = wishlistSlice.actions;

export default wishlistSlice.reducer;
