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
    formData.append("todate", "07/03/2023");
    try {
      const res = await axios.post(`${digiBaseUrl}MyOrders`, formData);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const UpdateUser = createAsyncThunk(
  "UpdateUser",
  async (
    {
      formValue,
      username,
      password,

      // userStateId,
      // userCityId,
      // emailId,
      // userPincode,
      // dateOfBirth,
      // nomineeName,
      // nomineeDateOfBirth,
      // nomineeRelation,
      // gender,
    },
    thunkAPI
  ) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("userStateId", formValue.userStateId);
    formData.append("userCityId", formValue.userCityId);
    formData.append("emailId", formValue.emailId);
    formData.append("userPincode", formValue.userPincode);
    formData.append("dateOfBirth", formValue.dateOfBirth);
    formData.append("nomineeName", formValue.nomineeName);
    formData.append("nomineeDateOfBirth", formValue.nomineeDateOfBirth);
    formData.append("nomineeRelation", formValue.nomineeRelation);
    formData.append("gender", formValue.gender);

    try {
      const res = await axios.post(`${digiBaseUrl}UpdateUser`, formData);
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
    update: {
      data: "",
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
    builder.addCase(UpdateUser.pending, (state, action) => {
      state.update.loading = true;
    });
    builder.addCase(UpdateUser.fulfilled, (state, action) => {
      state.update.data = action.payload;
      state.update.loading = false;
    });
    builder.addCase(UpdateUser.rejected, (state, action) => {
      state.update.error = action.error;
      state.update.loading = false;
    });
  },
});

export default userProfileSlice.reducer;
