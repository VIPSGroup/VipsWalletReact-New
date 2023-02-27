import { createSlice } from "@reduxjs/toolkit";

const quickModalSlice = createSlice({
  name: "quickModalSlice",
  initialState: {
    modalBool: false,
    QuickProduct: "",
  },
  reducers: {
    modalOpen: (state, action) => {
      state.QuickProduct = action.payload;
      state.modalBool = true;
    },
    modalClose: (state, action) => {
      state.modalBool = false;
    },
  },
});
export const { modalOpen, modalClose } = quickModalSlice.actions;
export default quickModalSlice.reducer;
