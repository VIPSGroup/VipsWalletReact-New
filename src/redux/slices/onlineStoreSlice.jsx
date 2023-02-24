import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl, staticTocken } from "../../constant/Baseurls";

export const getAffiliate = createAsyncThunk("getAffiliate", async () => {
  const formData = new FormData();

  formData.append("tocken", staticTocken);
  formData.append("Categoryid", "1");
  try {
    const res = await axios.post(
      `${baseApiUrl}/EcommerceServices/VCommissionProductViaCategory`,
      formData
    );
    return res.data;
  } catch (error) {
    return error;
  }
});

const onlineStoreSlice = createSlice({
  name: "onlineStoreSlice",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAffiliate.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAffiliate.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getAffiliate.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export default onlineStoreSlice.reducer;
