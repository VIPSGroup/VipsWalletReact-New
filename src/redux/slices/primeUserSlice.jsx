import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl } from "../../constant/Baseurls";

export const checkPrime = createAsyncThunk(
  "checkPrime",
  async (username, password) => {
    const formData = new FormData();
    formData.append("UserName", username);
    formData.append("Password", password);
    try {
      const res = await axios.post(
        `${baseApiUrl}/CardServices/ShoppingcardDetails`,
        formData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

const primeUserSlice = createSlice({
  name: "primeUserSlice",
  initialState: {
    checkPrimeUser: {
      data: [],
      loading: false,
      error: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // Check user prime Member or Not
    builder.addCase(checkPrime.pending, (state, action) => {
      state.checkPrimeUser.loading = true;
    });
    builder.addCase(checkPrime.fulfilled, (state, action) => {
      state.checkPrimeUser.data = action.payload;
      state.loading = false;
    });
    builder.addCase(checkPrime.rejected, (state, action) => {
      state.checkPrimeUser.error = action.error;
    });
  },
});

export default primeUserSlice.reducer;
