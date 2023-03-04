import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { appType, baseApiUrl, getDouble } from "../../../constants";

export const fetchLPGBill = createAsyncThunk(
    "fetchLPGBill",
    async ({obj, username, password}) => {
      const formData = new FormData();
      formData.append("UserName", `${username}`);
      formData.append("Password", `${password}`);
      for (let [key, value] of Object.entries(obj)) {
        formData.append(`${key}`, `${value}`);
      }
      try {
        const res = await axios.post(
          `${baseApiUrl}/Recharge/GetLPGGasBillFetchFBBPS`,formData );
          console.error(res.data);
        return res.data
      } catch (error) {
        return error;
      }
    }
  );
  export const getInputFieldsByOperator = createAsyncThunk(
    "getInputFieldsByOperator",
    async (ourCode) => {
      console.log(ourCode);
        const formData = new FormData();
        formData.append("billerId", ourCode);
        console.log(ourCode);
      try {
        const res = await axios.post(
            `${baseApiUrl}/Recharge/GetRegexValidationForLPG`,formData );
            console.warn(res.data.Data.Response);
        return res.data.Data.Response
      } catch (error) {
        return error;
      }
    }
  );
  export const LPGBillPay = createAsyncThunk(
    "LPGBillPay",
    async ({ username,
      password,
      billAmount,
      inputObj,
      paymentRef,
      refId,
      operatorCode,
      mobNo,
      pointType}) => {
        const formData = new FormData();

        formData.append("username", username);
        formData.append("password", password);
        formData.append("paymentReferenceId", paymentRef);
        formData.append("billAmount", billAmount);
        formData.append("convFees", "0");
        formData.append("paymentMode", "Wallet");
        // formData.append("Number", inputObj[0].fieldValue);
        formData.append("referenceId", refId);
        formData.append("BillUnit", "");
        formData.append("paymentInfoTagValue", "vipswallet|7720021133");
        formData.append("IP", "123");
        formData.append("OperatorCode", operatorCode);
        formData.append("PointType", pointType);
        formData.append("MobileNumber", mobNo);
        // formData.append("registerMobileNumber", mobNo);
        // formData.append("customerMobileNumber", mobNo);
        formData.append("AppType", appType);
        inputObj.map((e) => {
          formData.append(`${e.fieldName}`, `${e.fieldValue}`);
        });
      try {
        const res = await axios.post(
          `${baseApiUrl}/Recharge/GetLPGBillPaymentsFBBPS`,formData );
            console.warn(res.data);
        return res.data
      } catch (error) {
        return error;
      }
    }
  );


  const LpgGasSlice = createSlice({
    name: "LpgGasSlice",
    initialState: {
      inputFieldOperator: {
        loading: false,
        operatorData: [],
        error: "",
      },
    lpgBill: {
        loading: false,
        billData: [],
        error: "",
      },
    lpgPayment: {
        reLoading: false,
        rechargeData: [],
        error: "",
      }
    },
    reducers: {},
    extraReducers: (builder) => {
     builder.addCase(getInputFieldsByOperator.pending, (state, action) => {
        state.inputFieldOperator.loading = true;
      });
      builder.addCase(getInputFieldsByOperator.fulfilled, (state, action) => {
        state.inputFieldOperator.operatorData =action.payload;
        state.inputFieldOperator.loading = false;
      });
      builder.addCase(getInputFieldsByOperator.rejected, (state, action) => {
        state.inputFieldOperator.loading = false;
        state.inputFieldOperator.error = action.error;
      });
     builder.addCase(fetchLPGBill.pending, (state, action) => {
        state.lpgBill.loading = true;
      });
      builder.addCase(fetchLPGBill.fulfilled, (state, action) => {
        state.lpgBill.billData =action.payload;
        state.lpgBill.loading = false;
      });
      builder.addCase(fetchLPGBill.rejected, (state, action) => {
        state.lpgBill.loading = false;
        state.lpgBill.error = action.error;
      });
     builder.addCase(LPGBillPay.pending, (state, action) => {
        state.lpgPayment.reLoading = true;
      });
      builder.addCase(LPGBillPay.fulfilled, (state, action) => {
        state.lpgPayment.rechargeData =action.payload;
        state.lpgPayment.reLoading = false;
      });
      builder.addCase(LPGBillPay.rejected, (state, action) => {
        state.lpgPayment.reLoading = false;
        state.lpgPayment.error = action.error;
      });
    },
  });
  
  export default LpgGasSlice.reducer;