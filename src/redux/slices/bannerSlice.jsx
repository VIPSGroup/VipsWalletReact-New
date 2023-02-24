import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl, staticTocken } from "../../constants";

export const getSliderBannerImage = createAsyncThunk(
  "getSliderBannerImage",
  async () => {
    const formData = new FormData();
    formData.append("tocken", staticTocken);
    formData.append("appweb", "WEB");
    try {
      const res = await axios.post(
        `${baseApiUrl}/EcommerceServices/AllBanners`,
        formData
      );
      return res.data.Data;
    } catch (error) {
      return error;
    }
  }
);

const bannerSlice = createSlice({
  name: "bannerSlice",
  initialState: {
    SliderBanners: "",
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSliderBannerImage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSliderBannerImage.fulfilled, (state, action) => {
      state.SliderBanners = action.payload;
      state.loading = false;
    });
    builder.addCase(getSliderBannerImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default bannerSlice.reducer;
