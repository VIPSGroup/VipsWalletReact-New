import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl } from "../../constants";

export const placeOrder = createAsyncThunk("placeOrder", async (paymentObj) => {
  var json = JSON.stringify(paymentObj);
  try {
    const res = await axios.post(
      `${baseApiUrl}/EcommerceServices/PlaceOrders`,
      json
    );
    return res.data;
  } catch (error) {
    return error;
  }
});

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    orderPlace: {
      data: [],
      loading: false,
      error: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(placeOrder.pending, (state, action) => {
      state.orderPlace.loading = true;
    });
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.orderPlace.data = action.payload;
      state.orderPlace.loading = false;
    });
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.orderPlace.error = action.error;
      state.orderPlace.loading = false;
    });
  },
});

export default orderSlice.reducer;
