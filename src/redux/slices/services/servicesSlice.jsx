import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { appType, baseApiUrl } from "../../../constants";

export const getOperatorsByServiceId = createAsyncThunk(
    "getOperatorsByServiceId",
    async (serviceId) => {
      const formData = new FormData();
    formData.append("ServiceId", serviceId);
      try {
        const res = await axios.post(
            `${baseApiUrl}/OperatorServices/GetCommonElectricityOperatorByServiceId`,formData );
            console.warn(res.data);
            let sortedOperators = res.data.Data.sort((a, b) =>
            a.OperatorName.toLowerCase() > b.OperatorName.toLowerCase() ? 1 : -1
          );
        return sortedOperators
      } catch (error) {
        return error;
      }
    }
  );
export const naturalGasBillPay = createAsyncThunk(
    "naturalGasBillPay",
    async ({ username,
      password,
      billAmount,
      inputObj,
      paymentRef,
      refId,
      operatorCode,
      mobNo}) => {
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
        formData.append("PointType", "Shopping");
        formData.append("MobileNumber", mobNo);
        formData.append("registerMobileNumber", mobNo);
        formData.append("customerMobileNumber", mobNo);
        formData.append("AppType", appType);
      
        inputObj.map((e) => {
          formData.append(`${e.fieldName}`, `${e.fieldValue}`);
        });
      try {
        const res = await axios.post(
          `${baseApiUrl}/Recharge/GetUtilityNaturalGasBillPayment`,formData );
          console.error(res.data);
        return res.data
      } catch (error) {
        return error;
      }
    }
  );
export const commonServiceConfirm = createAsyncThunk(
    "commonServiceConfirm",
    async ({ username,
      password,
      billAmount,
      inputObj,
      paymentRef,
      refId,
      operatorCode,
      mobNo}) => {
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
        formData.append("PointType", "Shopping");
        formData.append("MobileNumber", mobNo);
        formData.append("registerMobileNumber", mobNo);
        formData.append("customerMobileNumber", mobNo);
        formData.append("AppType", appType);
      
        inputObj.map((e) => {
          formData.append(`${e.fieldName}`, `${e.fieldValue}`);
        });
      
      try {
        const res = await axios.post(
          `${baseApiUrl}/Recharge/UtilityOnlineBillPaymentsForAllFBBPSOperators`,formData );
          console.log(res.data);
        return res.data
      } catch (error) {
        return error;
      }
    }
  );


  const servicesSlice = createSlice({
    name: "servicesSlice",
    initialState: {
    operators: {
        loading: false,
        operatorsList: [],
        error: "",
      },
    gasBillPay: {
        gasLoading: false,
        gasBill: [],
        error: "",
      },
    commonBillPay: {
        commonLoading: false,
        commonBill: '',
        error: "",
      }
    },
    reducers: {},
    extraReducers: (builder) => {
     builder.addCase(getOperatorsByServiceId.pending, (state, action) => {
        state.operators.loading = true;
      });
      builder.addCase(getOperatorsByServiceId.fulfilled, (state, action) => {
        state.operators.operatorsList =action.payload;
        state.operators.loading = false;
      });
      builder.addCase(getOperatorsByServiceId.rejected, (state, action) => {
        state.operators.loading = false;
        state.operators.error = action.error;
      });
     builder.addCase(naturalGasBillPay.pending, (state, action) => {
        state.gasBillPay.gasLoading = true;
      });
      builder.addCase(naturalGasBillPay.fulfilled, (state, action) => {
        state.gasBillPay.gasBill =action.payload;
        state.gasBillPay.gasLoading = false;
      });
      builder.addCase(naturalGasBillPay.rejected, (state, action) => {
        state.gasBillPay.gasLoading = false;
        state.gasBillPay.error = action.error;
      });
     builder.addCase(commonServiceConfirm.pending, (state, action) => {
        state.commonBillPay.commonLoading = true;
      });
      builder.addCase(commonServiceConfirm.fulfilled, (state, action) => {
        state.commonBillPay.commonBill =action.payload;
        state.commonBillPay.commonLoading = false;
      });
      builder.addCase(commonServiceConfirm.rejected, (state, action) => {
        state.commonBillPay.commonLoading = false;
        state.commonBillPay.error = action.error;
      });
      
    },
  });
  
  export default servicesSlice.reducer;

