import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl } from "../../constant/Baseurls";

export const getDealsOfTheDay = createAsyncThunk(
  "getDealsOfTheDay",
  async () => {
    const formData = new FormData();
    formData.append("tocken", "XMCNBVGDTE734BCU65DW");
    formData.append("Categoryid", null);
    try {
      const res = await axios.post(
        `${baseApiUrl}/EcommerceServices/GetDODProduct`,
        formData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

const dealsSlice = createSlice({
  name: "dealsSlice",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDealsOfTheDay.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getDealsOfTheDay.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getDealsOfTheDay.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export default dealsSlice.reducer;
