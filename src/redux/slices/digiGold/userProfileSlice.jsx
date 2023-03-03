import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { digiBaseUrl } from "../../../constants";

export const GetUserProfileDetails = createAsyncThunk(
  "GetUserProfileDetails",
  async () => {
    try {
      const res = await axios.post(`${digiBaseUrl}GetUserProfileDetails`);
      console.log(res.data, "hjfhdghj");
    } catch (error) {}
  }
);

const userProfileSlice = createSlice({
  name: "userProfileSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});

export default userProfileSlice.reducer;
