import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { appType, baseApiUrl } from "../../../constants";

export const getElectricityOperators = createAsyncThunk(
    "getElectricityOperators",
    async () => {
      const formData = new FormData();
    formData.append("ServiceId", "6");
      try {
        const res = await axios.post(
            `${baseApiUrl}/OperatorServices/GetCommonElectricityOperatorByServiceId`,formData );
          //   let sortedOperators = res.data.Data.sort((a, b) =>
          //   a.OperatorName > b.OperatorName ? 1 : -1
          // );
          return res.data.Data.sort((a, b) =>
          a.OperatorName > b.OperatorName ? 1 : -1
        );
      } catch (error) {
        return error;
      }
    }
  );
export const getSubdivisionData = createAsyncThunk(
    "getSubdivisionData",
    async (ourCode) => {
      try {
        const res = await axios.get(
            `${baseApiUrl}/Recharge/GetElectricitySubdivision?Opcode=${ourCode}` );
            return res.data.Data
      } catch (error) {
        return error;
      }
    }
  );
export const OnlinefinalElecticity = createAsyncThunk(
    "OnlinefinalElecticity",
    async ({ username,
        password,
        billAmount,
        inputObj,
        paymentRef,
        refId,
        operatorCode,
        mobNo,
        paymentMode,
        pointType}) => {
            const formData = new FormData();

            formData.append("username", username);
            formData.append("password", password);
            formData.append("paymentReferenceId", paymentRef);
            formData.append("billAmount", billAmount);
            formData.append("convFees", "0");
            formData.append("paymentMode", "Wallet");
            formData.append("Number", inputObj[0].fieldValue);
            formData.append("referenceId", refId === undefined ? paymentRef : refId);
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

              let url = "";
              if (paymentMode === 1) {
                url = `${baseApiUrl}/Recharge/GetUtilityAllElectricityBillPayments`;
              } else {
                url = `${baseApiUrl}/Recharge/UtilityOfflineBillPaymentsForAllFBBPSOperators`;
              }
            
      try {
        const res = await axios.post(url,formData );
            return res.data
      } catch (error) {
        return error;
      }
    }
  );
  const electricitySlice = createSlice({
    name: "electricitySlice",
    initialState: {
    electricityOperators: {
        loading: false,
        operatorsList: [],
        error: "",
      },
      getSubdivisionData: {
        loading: false,
        subDivisionData: [],
        error: "",
      },
      electricityBill: {
        reLoading: false,
        rechargeData: [],
        error: "",
      }
    },
    reducers: {},
    extraReducers: (builder) => {
     builder.addCase(getElectricityOperators.pending, (state, action) => {
        state.electricityOperators.loading = true;
      });
      builder.addCase(getElectricityOperators.fulfilled, (state, action) => {
        state.electricityOperators.operatorsList =action.payload;
        state.electricityOperators.loading = false;
      });
      builder.addCase(getElectricityOperators.rejected, (state, action) => {
        state.electricityOperators.loading = false;
        state.electricityOperators.error = action.error;
      });
     builder.addCase(getSubdivisionData.pending, (state, action) => {
        state.getSubdivisionData.loading = true;
      });
      builder.addCase(getSubdivisionData.fulfilled, (state, action) => {
        state.getSubdivisionData.subDivisionData =action.payload;
        state.getSubdivisionData.loading = false;
      });
      builder.addCase(getSubdivisionData.rejected, (state, action) => {
        state.getSubdivisionData.loading = false;
        state.getSubdivisionData.error = action.error;
      });
     builder.addCase(OnlinefinalElecticity.pending, (state, action) => {
        state.electricityBill.reLoading = true;
      });
      builder.addCase(OnlinefinalElecticity.fulfilled, (state, action) => {
        state.electricityBill.rechargeData =action.payload;
        state.electricityBill.reLoading = false;
      });
      builder.addCase(OnlinefinalElecticity.rejected, (state, action) => {
        state.electricityBill.reLoading = false;
        state.electricityBill.error = action.error;
      });
    },
  });
  
  export default electricitySlice.reducer;