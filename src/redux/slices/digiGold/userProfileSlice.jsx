import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { digiBaseUrl } from "../../../constants";

export const GetUserProfileDetails = createAsyncThunk(
  "GetUserProfileDetails",
  async () => {
    try {
      const res = await axios.post(`${digiBaseUrl}GetUserProfileDetails`);
      return res.data;
    } catch (error) {}
  }
);
export const MyOrders = createAsyncThunk(
  "MyOrders",
  async ({ username, password }, thunkAPI) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("fromdate", "01/03/2023");
    formData.append("todate", "06/03/2023");

    try {
      const res = await axios.post(`${digiBaseUrl}MyOrders`, formData);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfileSlice",
  initialState: {
    myOrders: {
      ordersList: "",
      loading: false,
      error: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(MyOrders.pending, (state, action) => {
      state.myOrders.loading = true;
    });
    builder.addCase(MyOrders.fulfilled, (state, action) => {
      state.myOrders.ordersList = action.payload;
      state.myOrders.loading = false;
    });
    builder.addCase(MyOrders.rejected, (state, action) => {
      state.myOrders.error = action.error;
      state.myOrders.loading = false;
    });
  },
});

export default userProfileSlice.reducer;
