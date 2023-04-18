import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl } from "../../../constants";

export const getBusCityList = createAsyncThunk(
  "getBusCityList",
  async () => {

    const formData = new FormData();
    // formData.append("username", username);
    try {
        return fetch(`${baseApiUrl}/ServiceApiBus/GetBusCityList`, {
            method: "POST",
            body: formData,
          })
            .then((data) => {
              return data.json();
            })
            .catch((err) => {});
    } catch (error) {
    }
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
      state.cityList.loading = true;
    });
    builder.addCase(getBusCityList.fulfilled, (state, action) => {
      state.cityList.cities = action.payload;
      state.cityList.loading = false;
    });
    builder.addCase(getBusCityList.rejected, (state, action) => {
      state.cityList.error = action.error;
      state.cityList.loading = false;
    });
  },
});

export default busBookingSlice.reducer;
