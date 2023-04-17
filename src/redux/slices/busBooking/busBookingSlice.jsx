import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl } from "../../../constants";

export const getBusCityList = createAsyncThunk(
  "getBusCityList",
  async ({ formValue, emailId, password, username }, thunkAPI) => {

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
        return fetch(`${baseApiUrl}/ServiceApiBus/GetBusCityList`, {
            method: "POST",
            // body: formData,
          })
            .then((data) => {
                console.log(data);
              return data.json();
            })
            .catch((err) => {});
    } catch (error) {}
  }
);
const busBookingSlice = createSlice({
  name: "busBookingSlice",
  initialState: {
    cityList: {
      cities: "",
      loading: false,
      error: "",
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getBusCityList.pending, (state, action) => {
      state.register.loading = true;
    });
    builder.addCase(getBusCityList.fulfilled, (state, action) => {
      state.register.cities = action.payload;
      state.register.loading = false;
    });
    builder.addCase(getBusCityList.rejected, (state, action) => {
      state.register.error = action.error;
      state.register.loading = false;
    });
  },
});

export default busBookingSlice.reducer;
