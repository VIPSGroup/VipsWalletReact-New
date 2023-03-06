import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseApiUrl, getDouble } from "../../constants";
// import axios from "axios";
// import { baseApiUrl, getDouble } from "../../constants";

// // export const getServiceDiscounts = createAsyncThunk(
// //   "getServiceDiscounts",
// //   async ({ amt, response }, thunkAPI) => {
// //     const formData = new FormData();
// //     formData.append("ServiceId", "1");
// //     try {
// //       const res = await axios.post(
// //         `${baseApiUrl}/OperatorServices/GetServiceName`,
// //         formData
// //       );
// //       return [res.data, amt, response];
// //     } catch (error) {
// //       return error;
// //     }
// //   }
// // );

// export const getServiceDiscounts = async () => {
//   const formData = new FormData();
//   formData.append("ServiceId", "1");
//   try {
//     const res = await axios.post(
//       `${baseApiUrl}/OperatorServices/GetServiceName`,
//       formData
//     );

//   } catch (error) {}
//   //   return fetch(`${baseApiUrl}/OperatorServices/GetServiceName`, {
//   //     method: "POST",
//   //   })
//   //     .then((data) => {
//   //       return data.json();
//   //     })
//   //     .catch((err) => {});
// };

// const coreSlice = createSlice({
//   name: "coreSlice",
//   initialState: {
//     serviceDiscount: {
//       DiscountObj: {},
//       ShoppingDiscount: "",
//       finalAmount: "",
//       primeDiscount: "",
//     },
//   },
//   reducers: {},
//   //   extraReducers: (builder) => {
//   //     builder.addCase(getServiceDiscounts.pending, (state, action) => {});
//   //     builder.addCase(getServiceDiscounts.fulfilled, (state, action) => {
//   //       var result = action.payload[0].Data.filter((r) => r.Id == "1");
//   //       state.serviceDiscount.DiscountObj = result[0];
//   //       // //   setDiscountObj(result[0]);
//   //       const sDiscount = (result[0].ShoppingPer / 100) * action.payload[1];
//   //       if (sDiscount <= action.payload[2].Data.Shoppingpoints) {
//   //         state.serviceDiscount.ShoppingDiscount = getDouble(sDiscount);
//   //         //   setShoppingDiscount(getDouble(sDiscount));
//   //         const amt = parseInt(action.payload[1]) - parseInt(sDiscount);
//   //         state.serviceDiscount.finalAmount = amt;
//   //         // setFinalAmount(amt);
//   //       } else {
//   //         state.serviceDiscount.ShoppingDiscount = getDouble(
//   //           action.payload[2].Data.Shoppingpoints
//   //         );
//   //         state.serviceDiscount.finalAmount =
//   //           action.payload[1] - action.payload[2].Data.Shoppingpoints;
//   //         // setShoppingDiscount(getDouble(response.Data.Shoppingpoints));
//   //         // setFinalAmount(amt - response.Data.Shoppingpoints);
//   //       }
//   //       const pDiscount = (result[0].PrimePointPer / 100) * action.payload[1];
//   //       if (pDiscount <= action.payload[2].Data.PrimePoints) {
//   //         state.serviceDiscount.primeDiscount = getDouble(pDiscount);
//   //         state.serviceDiscount.finalAmount = action.payload[1] - pDiscount;
//   //         // setPrimeDiscount(getDouble(pDiscount));
//   //         // setFinalAmount(amt - pDiscount);
//   //       } else {
//   //         state.serviceDiscount.primeDiscount = getDouble(
//   //           action.payload[2].Data.PrimePoints
//   //         );

//   //         state.serviceDiscount.finalAmount =
//   //           action.payload[1] - action.payload[2].Data.PrimePoints;
//   //         // setPrimeDiscount(getDouble(response.Data.PrimePoints));
//   //         // setFinalAmount(amt - response.Data.PrimePoints);
//   //       }
//   //     });
//   //     builder.addCase(getServiceDiscounts.rejected, (state, action) => {});
//   //   },
// });
// export default coreSlice.reducer;

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

const coreSlice = createSlice({
  name: "coreSlice",
  initialState: {
    discountObj: null,
    shoppingDiscount: 0,
    primeDiscount: 0,
    finalAmount: 0,
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
  },
});

export default coreSlice.reducer;
