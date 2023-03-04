import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { digiBaseUrl } from "../../../constants";

export const registerDigiGold = createAsyncThunk(
  "registerDigiGold",
  async ({ formValue, emailId, password, username }, thunkAPI) => {
    console.log(password, username, "formValue");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("mobileNumber", formValue.mobileNumber);
    formData.append("emailId", emailId);
    formData.append("Name", formValue.Name);
    formData.append("userCityId", formValue.userCityId);
    formData.append("userStateId", formValue.userStateId);
    formData.append("otp", formValue.otp);
    try {
      const res = await axios.post(`${digiBaseUrl}SignUp`, formData);
      return res.data;
    } catch (error) {}
  }
);
export const loginDigiGold = createAsyncThunk(
  "loginDigiGold",
  async ({ username, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${digiBaseUrl}Login`, {
        Username: username,
        Password: password,
      });
      return res.data;
    } catch (error) {}
  }
);
export const getStateList = createAsyncThunk("getStateList", async () => {
  try {
    const res = await axios.post(`${digiBaseUrl}StateList`);
    return res.data;
  } catch (error) {}
});
export const getCityList = createAsyncThunk("getCityList", async (stateId) => {
  try {
    const res = await axios.post(`${digiBaseUrl}CityList`, {
      stateId: stateId,
    });
    return res.data;
  } catch (error) {}
});

const registerDigiSlice = createSlice({
  name: "registerDigiSlice",
  initialState: {
    register: {
      data: "",
      loading: false,
      error: "",
    },
    login: {
      logData: "",
      loading: false,
      error: "",
    },
    stateData: {
      stateList: "",
      loading: false,
    },
    cityData: {
      cityList: "",
      loading: false,
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerDigiGold.pending, (state, action) => {
      state.register.loading = true;
    });
    builder.addCase(registerDigiGold.fulfilled, (state, action) => {
      state.register.data = action.payload;
      state.register.loading = false;
    });
    builder.addCase(registerDigiGold.rejected, (state, action) => {
      state.register.error = action.error;
      state.register.loading = false;
    });
    builder.addCase(loginDigiGold.pending, (state, action) => {
      state.login.loading = true;
    });
    builder.addCase(loginDigiGold.fulfilled, (state, action) => {
      state.login.logData = action.payload;
      state.login.loading = false;
    });
    builder.addCase(loginDigiGold.rejected, (state, action) => {
      state.login.error = action.error;
      state.login.loading = false;
    });
    builder.addCase(getStateList.pending, (state, action) => {
      state.stateData.loading = true;
    });
    builder.addCase(getStateList.fulfilled, (state, action) => {
      state.stateData.stateList = action.payload;
      state.stateData.loading = false;
    });
    builder.addCase(getStateList.rejected, (state, action) => {
      state.stateData.loading = false;
    });
    builder.addCase(getCityList.pending, (state, action) => {
      state.cityData.loading = true;
    });
    builder.addCase(getCityList.fulfilled, (state, action) => {
      state.cityData.cityList = action.payload;
      state.cityData.loading = false;
    });
    builder.addCase(getCityList.rejected, (state, action) => {
      state.cityData.loading = false;
    });
  },
});

export default registerDigiSlice.reducer;
