import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { digiBaseUrl } from "../../../constants";

export const fetchGoldSilverRates = createAsyncThunk(
  "fetchGoldSilverRates",
  async () => {
    try {
      const res = await axios.post(`${digiBaseUrl}GetGoldSilverRates`);
      return res.data;
    } catch (error) {}
  }
);

export const startFetchData = () => (dispatch) => {
  setInterval(() => {
    dispatch(fetchGoldSilverRates());
  }, 60000); // call every 1 minute (60 seconds)
};

const digiGoldSlice = createSlice({
  name: "digiGoldSlice",
  initialState: {
    modal: {
      modalBool: false,
    },
    rates: {
      rateData: "",
      loading: false,
      error: "",
    },
  },
  reducers: {
    modalOpen: (state, action) => {
      state.modal.modalBool = true;
    },
    modalClose: (state, action) => {
      state.modal.modalBool = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoldSilverRates.pending, (state, action) => {
      state.rates.loading = true;
    });
    builder.addCase(fetchGoldSilverRates.fulfilled, (state, action) => {
      state.rates.rateData = action.payload;
      state.rates.loading = false;
    });
    builder.addCase(fetchGoldSilverRates.rejected, (state, action) => {
      state.rates.error = action.error;
      state.rates.loading = false;
    });
  },
});
export const { modalOpen, modalClose } = digiGoldSlice.actions;
export default digiGoldSlice.reducer;
