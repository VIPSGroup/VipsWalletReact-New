import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { appType, baseApiUrl, getDouble } from "../../../constants";

export const getFastagOperators = createAsyncThunk(
    "getFastagOperators",
    async () => {
      const formData = new FormData();
    formData.append("ServiceId", "36");
      try {
        const res = await axios.post(
            `${baseApiUrl}/OperatorServices/GetCommonElectricityOperatorByServiceId`,formData );
        return res.data.Data.sort((a, b) =>
        a.OperatorName > b.OperatorName ? 1 : -1
      )
      } catch (error) {
        return error;
      }
    }
  ); 
export const getInputFieldsByOperator = createAsyncThunk(
    "getInputFieldsByOperator",
    async (ourCode) => {
        const formData = new FormData();
        formData.append("billerId", ourCode);
      try {
        const res = await axios.post(
            `${baseApiUrl}/Recharge/GetRegexValidationForLPG`,formData );
        return res.data.Data.Response
      } catch (error) {
        return error;
      }
    }
  ); 
  
export const fetchBill = createAsyncThunk(
    "fetchBill",
 async ({obj, username, password}) => {
  let data = new URLSearchParams();
  for (let [key, value] of Object.entries(obj)) {
    data.append(`${key}`, `${value}`);
  }
  const headers = {
    'Content-Type': "application/x-www-form-urlencoded",
    'Authorization': "Basic " + btoa(`${username}:${password}`)
  }
  try {
    const res = await axios.post(
      `${baseApiUrl}/Recharge/GetCommonFBBPSBillFetch`,data ,{ headers: headers});
    return res.data.Data
  } catch (error) {
    return error;
  }
}
  ); 
export const fastagOnlineConfirmation = createAsyncThunk(
    "fastagOnlineConfirmation",
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

    formData.append("UserName", username);
    formData.append("Password", password);
    formData.append("paymentReferenceId", paymentRef);
    formData.append("billAmount", billAmount);
    formData.append("convFees", "00");
    formData.append("paymentMode", "Wallet");
    formData.append("referenceId", refId);
    formData.append("Number", inputObj[0].fieldValue);
    formData.append("BillUnit", "");
    formData.append("paymentInfoTagValue", "vipswallet|7720021133");
    formData.append("IP", "123");
    formData.append("OperatorCode", operatorCode);
    formData.append("PointType", pointType);
    formData.append("MobileNumber", mobNo);
    formData.append("registerMobileNumber", mobNo);
    formData.append("customerMobileNumber", mobNo);
    formData.append("AppType", appType);
  
    inputObj.map((e) => {
      formData.append(`${e.fieldName}`, `${e.fieldValue}`);
    });
  try {
    const res = await axios.post(
      `${baseApiUrl}/Recharge/GetFastTagBillPaymentsFBBPS`,formData);
    return res.data
  } catch (error) {
    return error;
  }
}
  );


  const fastagSlice = createSlice({
    name: "fastagSlice",
    initialState: {
    fastgOperators: {
        loading: false,
        operatorsList: [],
        error: "",
      },
    inputFieldOperator: {
        loading: false,
        operatorData: [],
        error: "",
      },
    getBill: {
      billLoading: false,
        billData: {},
        error: "",
      },
    fastagRecharge: {
      reLoading: false,
        fastagRecharge: {},
        error: "",
      }
    },
    reducers: {},
    extraReducers: (builder) => {
     builder.addCase(getFastagOperators.pending, (state, action) => {
        state.fastgOperators.loading = true;
      });
      builder.addCase(getFastagOperators.fulfilled, (state, action) => {
        state.fastgOperators.operatorsList =action.payload;
        state.fastgOperators.loading = false;
      });
      builder.addCase(getFastagOperators.rejected, (state, action) => {
        state.fastgOperators.loading = false;
        state.fastgOperators.error = action.error;
      });
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
     builder.addCase(fetchBill.pending, (state, action) => {
        state.getBill.billLoading = true;
      });
      builder.addCase(fetchBill.fulfilled, (state, action) => {
        state.getBill.billData =action.payload;
        state.getBill.billLoading = false;
      });
      builder.addCase(fetchBill.rejected, (state, action) => {
        state.getBill.billLoading = false;
        state.getBill.error = action.error;
      });
     builder.addCase(fastagOnlineConfirmation.pending, (state, action) => {
        state.fastagRecharge.reLoading = true;
      });
      builder.addCase(fastagOnlineConfirmation.fulfilled, (state, action) => {
        state.fastagRecharge.fastagRecharge =action.payload;
        state.fastagRecharge.reLoading = false;
      });
      builder.addCase(fastagOnlineConfirmation.rejected, (state, action) => {
        state.fastagRecharge.reLoading = false;
        state.fastagRecharge.error = action.error;
      });
    },
  });
  export default fastagSlice.reducer;