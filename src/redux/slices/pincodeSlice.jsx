import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl } from "../../constant/Baseurls";

export const checkPinCode = createAsyncThunk(
  "checkPinCode",
  async (productId, pincode) => {
    const formData = new FormData();
    formData.append("ProductId", productId);
    formData.append("Pincode", pincode);
    try {
      const res = await axios.post(
        `${baseApiUrl}/EcommerceServices/Validatepincode`,
        formData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

const pincodeSlice = createSlice({
  name: "pincodeSlice",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkPinCode.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(checkPinCode.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(checkPinCode.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export default pincodeSlice.reducer;
