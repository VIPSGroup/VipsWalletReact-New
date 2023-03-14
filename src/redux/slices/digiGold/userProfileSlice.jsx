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
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month =
      (currentDate.getMonth() + 1 < 10 ? "0" : "") +
      (currentDate.getMonth() + 1);
    let day = (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate();

    const Today = `${day}/${month}/${year}`;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("fromdate", "01/03/2023");
    formData.append("todate", Today);
    try {
      const res = await axios.post(`${digiBaseUrl}MyOrders`, formData);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getSellStatus = createAsyncThunk(
  "GetWithdrawInfo",
  async ({ transactionId, Username, Password }, thunkAPI) => {
    console.log(transactionId, Username, Password);
    const formData = new FormData();
    formData.append("transactionId", transactionId);
    formData.append("Username", Username);
    formData.append("Password", Password);
    try {
      const res = await axios.post(`${digiBaseUrl}GetWithdrawInfo`, formData);
      console.warn(res.data);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const downloadPdf = createAsyncThunk(
  "downloadPdf",
  async (transactionId, thunkAPI) => {
    console.log(transactionId);
    const formData = new FormData();
    formData.append("transactionid", transactionId);
    try {
      const res = await axios.post(`${digiBaseUrl}GetInvoice`, formData);

      console.warn(res.data);
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
    // formData.append("userPincode", formValue.userPincode);
    formData.append("dateOfBirth", formValue.dateOfBirth);
    formData.append("nomineeName", formValue.nomineeName);
    formData.append("nomineeDateOfBirth", formValue.nomineeDateOfBirth);
    formData.append("nomineeRelation", formValue.nomineeRelation);
    // formData.append("gender", formValue.gender);

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
    sellStatus: {
      data: "",
      loading: false,
      error: "",
    },
    invoice: {
      pdfData: "",
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
    builder.addCase(getSellStatus.pending, (state, action) => {
      state.sellStatus.loading = true;
    });
    builder.addCase(getSellStatus.fulfilled, (state, action) => {
      state.sellStatus.data = action.payload;
      state.sellStatus.loading = false;
    });
    builder.addCase(getSellStatus.rejected, (state, action) => {
      state.sellStatus.error = action.error;
      state.sellStatus.loading = false;
    });
    builder.addCase(downloadPdf.pending, (state, action) => {
      state.invoice.loading = true;
    });
    builder.addCase(downloadPdf.fulfilled, (state, action) => {
      state.invoice.pdfData = action.payload;
      state.invoice.loading = false;
    });
    builder.addCase(downloadPdf.rejected, (state, action) => {
      state.invoice.error = action.error;
      state.invoice.loading = false;
    });
  },
});

export default userProfileSlice.reducer;
