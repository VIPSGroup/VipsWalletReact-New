import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl, digiGoldServiceId, getDouble } from "../../constants";

export const CheckServiceEnableOrNot = createAsyncThunk(
  "CheckServiceEnableOrNot",
  async () => {
    try {
      const res = await axios.post(
        `${baseApiUrl}/ServiceApiHotel/GetServiceStatus`,
        {
          ServiceId: digiGoldServiceId,
        }
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

const coreSlice = createSlice({
  name: "coreSlice",
  initialState: {
    discountObj: null,
    shoppingDiscount: 0,
    primeDiscount: 0,
    finalAmount: 0,
    isServiceEnable: "",
    ServiceEnableLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // CheckServiceIDActiveOrNot
    builder.addCase(CheckServiceEnableOrNot.pending, (state, action) => {
      state.ServiceEnableLoading = true;
    });
    builder.addCase(CheckServiceEnableOrNot.fulfilled, (state, action) => {
      state.isServiceEnable = action.payload;
      state.ServiceEnableLoading = false;
    });
  },
});

export default coreSlice.reducer;
