import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl } from "../../../constants";

export const getDynamicContent = createAsyncThunk(
  "getDynamicContent",
  async (value) => {
    try {
      const res = await axios.post(
        `${baseApiUrl}/EcommerceServices/AllTermsAndCondition`
      );
      console.error(res.data);
      return [res.data, value];
    } catch (error) {}
  }
);

const publicSlice = createSlice({
  name: "publicSlice",
  initialState: {
    termscondition: {
      data: "",
      loading: false,
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDynamicContent.pending, (state, action) => {
      state.termscondition.loading = true;
    });
    builder.addCase(getDynamicContent.fulfilled, (state, action) => {
    console.error(action.payload[0].Data.find(item=>item.Type==="Terms And Conditions"));
      let collection = action.payload[0].Data.find(
        (element) => element.Type === action.payload[1]
      );

      state.termscondition.data = collection;
      state.termscondition.loading = false;
    });
  },
});

export default publicSlice.reducer;
