import { createSlice } from "@reduxjs/toolkit";

const getCategoryIdSlice = createSlice({
  name: "getCategoryIdSlice",
  initialState: {
    categoryId: "",
  },
  reducers: {
    getCategoryId: (state, action) => {
      state.categoryId = action.payload;
    }
  },
});

export const { getCategoryId } = getCategoryIdSlice.actions;

export default getCategoryIdSlice.reducer;
