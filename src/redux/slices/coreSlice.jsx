import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl, digiGoldServiceId, getDouble } from "../../constants";

export const getServiceDiscounts = createAsyncThunk(
  "getServiceDiscounts",
  async ({ amt, response }, thunkAPI) => {
    const res = await fetch(`${baseApiUrl}/OperatorServices/GetServiceName`, {
      method: "POST",
    });
    const data = await res.json();
    return [data, amt, response];
  }
);
export const CheckServiceEnableOrNot = createAsyncThunk(
  "CheckServiceEnableOrNot",
  async () => {
    try {
      const res = await axios.post(
        `${baseApiUrl}/ServiceApiHotel/GetServiceStatus`,
        {
          ServiceId: digiGoldServiceId,
        }
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

const coreSlice = createSlice({
  name: "coreSlice",
  initialState: {
    discountObj: null,
    shoppingDiscount: 0,
    primeDiscount: 0,
    finalAmount: 0,
    isServiceEnable: "",
    ServiceEnableLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServiceDiscounts.fulfilled, (state, action) => {
      //   const discountObj = action.payload.Data.find((r) => r.Id === "1");
      //   const sDiscount = (discountObj.ShoppingPer / 100) * action.payload[0];
      //   const pDiscount = (discountObj.PrimePointPer / 100) * action.payload[0];
      //   const shoppingDiscount =
      //     sDiscount <= action.payload[1].Data.Shoppingpoints
      //       ? sDiscount
      //       : action.payload[1].Data.Shoppingpoints;
      //   const primeDiscount =
      //     pDiscount <= action.payload[1].Data.PrimePoints
      //       ? pDiscount
      //       : action.payload[1].Data.PrimePoints;
      //   const finalAmount = action.payload[0] - shoppingDiscount - primeDiscount;

      //   state.discountObj = discountObj;
      //   state.shoppingDiscount = getDouble(shoppingDiscount);
      //   state.primeDiscount = getDouble(primeDiscount);
      //   state.finalAmount = finalAmount;

      const response = action.payload[2];
      const amt = action.payload[1]; // Replace with your actual amount
      const discountObj = response.Data.find((r) => r.Id === "1");
      const sDiscount = (discountObj.ShoppingPer / 100) * amt;
      const pDiscount = (discountObj.PrimePointPer / 100) * amt;
      const shoppingDiscount =
        sDiscount <= response.Data.Shoppingpoints
          ? getDouble(sDiscount)
          : getDouble(response.Data.Shoppingpoints);
      const primeDiscount =
        pDiscount <= response.Data.PrimePoints
          ? getDouble(pDiscount)
          : getDouble(response.Data.PrimePoints);
      const finalAmount = amt - shoppingDiscount - primeDiscount;

      state.discountObj = discountObj;
      state.shoppingDiscount = shoppingDiscount;
      state.primeDiscount = primeDiscount;
      state.finalAmount = finalAmount;
    });

    // CheckServiceIDActiveOrNot
    builder.addCase(CheckServiceEnableOrNot.pending, (state, action) => {
      state.ServiceEnableLoading = true;
    });
    builder.addCase(CheckServiceEnableOrNot.fulfilled, (state, action) => {
      state.isServiceEnable = action.payload;
      state.ServiceEnableLoading = false;
    });
  },
});

export default coreSlice.reducer;
