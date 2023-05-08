import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { appType, baseApiUrl, getDouble } from "../../../constants";

export const getOperators = createAsyncThunk(
  "getOperators",
  async (serviceId) => {
    const formData = new FormData();
    formData.append("ServiceId", serviceId);
    try {
      const res = await axios.post(
        `${baseApiUrl}/operatorServices/GetOperatorName`,
        formData
      );
      return res.data.Data.sort((a, b) =>
        a.OperatorName > b.OperatorName ? 1 : -1
      );
    } catch (error) {
      return error;
    }
  }
);
export const getServiceDiscounts = createAsyncThunk(
  "getServiceDiscounts",
  async ({ amt, discountType, serviceId }, { getState }) => {
    const {
      walletSlice: {
        walletBalance: {
          data: { Data },
        },
      },
    } = getState();
    const formData = new FormData();
    formData.append("ServiceId", serviceId);
    try {
      const res = await axios.post(
        `${baseApiUrl}/OperatorServices/GetServiceName`,
        formData
      );
      let shoppingDiscount;
      let finalAmount;
      let primePointDiscount;
      let result = res?.data?.Data?.filter((r) => r.Id === serviceId)[0];
      if (discountType === "SHOPPING") {
        const shoppDisocunt = (result.ShoppingPer / 100) * amt;
        if (shoppDisocunt <= Data?.Shoppingpoints) {
          shoppingDiscount = getDouble(shoppDisocunt);
          finalAmount = amt - shoppDisocunt;
        } else {
          shoppingDiscount = Data?.Shoppingpoints;
          finalAmount = amt - Data?.Shoppingpoints;
        }
      }
      if (discountType === "PRIME") {
        let primeDiscount = (result.PrimePointPer / 100) * amt;
        if (primeDiscount <= Data?.PrimePoints) {
          primePointDiscount = getDouble(primeDiscount);
          finalAmount = amt - primeDiscount;
        } else if (Data?.PrimePoints === 0) {
          primePointDiscount = Data?.PrimePoints;
          finalAmount = amt;
        } else {
          primePointDiscount = Data?.PrimePoints;
          finalAmount = amt - Data?.PrimePoints;
        }
      }
      return {
        shoppingDiscount,
        primePointDiscount,
        finalAmount,
        discountData: result,
      };
    } catch (error) {
      return error;
    }
  }
  );
  
  
  export const finalRecharge = createAsyncThunk(
    "finalRecharge",
    async ({rechargeType, userName, password, amount, number, operatorId,circleId,pointType,operator,circle}) => {
      const formData = new FormData();
      formData.append("username", userName);
      formData.append("password", password);
      formData.append("amount", amount);
      formData.append("mobileNumber", number);
      formData.append("optid", operatorId);
      if(rechargeType==="Mobile"){
        formData.append("circle", circleId);
        formData.append("type", "");
      }
      if(rechargeType==="dth"){
          formData.append("circle","0");
          formData.append("type", "DTH Number");
      }
      formData.append("accountNo", "");
      formData.append("isShop", true);
      formData.append("pointType", pointType);
      formData.append("AppType", appType);
      try {
        const res = await axios.post(
          `${baseApiUrl}/Recharge/GetAllRecharge`,formData);
        return res.data
      } catch (error) {
        return error;
      }
    }
  );
export const getRechargeHistory = createAsyncThunk(
  "getRechargeHistory",
  async ({ userName, password, to, serviceId, type }) => {
    const formData = new FormData();
    formData.append("UserName", userName);
    formData.append("Password", password);
    formData.append("FromDate", "01/01/2015");
    formData.append("ToDate", to);
    formData.append("ServiceID", serviceId);
    try {
      const res = await axios.post(
        `${baseApiUrl}/UsersReports/GetTransactionHistory`,
        formData
      );
      let data;
      if (type === "dth") {
        data = res.data?.Data?.filter((item) => item.ServiceName === "DTH");
      } else if (type === "Mobile") {
        data = res.data?.Data?.filter((item) => item.ServiceId == serviceId);
      } else {
        data = res.data?.Data?.filter((item) => item.ServiceId == serviceId);
      }
      return data ? data : [];
    } catch (error) {
      return error;
    }
  }
);
export const getServiceName = createAsyncThunk(
  "getServiceName",
  async ({ digiGoldServiceId }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseApiUrl}/OperatorServices/GetServiceName`
      );
      return res.data.Data.find((a) => a.Id === digiGoldServiceId);
    } catch (error) {
      return error;
    }
  }
);
export const globalConfiguration = (type) => {
  return fetch(`${baseApiUrl}/GlobalConfiguration/GetConfigBySubKey`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("VipsWallet:vips@@1029"),
    },
    body: JSON.stringify({
      key: type,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState: {
    operators: {
      loading: false,
      operatorsList: [],
      error: "",
    },
    finalRecharge: {
      loading: false,
      rechargeData: null,
      error: "",
    },
    rechargeHistory: {
      loading: false,
      rechargeHistoryList: [],
      error: "",
    },
    serviceDiscount: {
      spLoading: false,
      discount: {},
      error: "",
    },
    ServiceName: {
      ServiceData: "",
      ServiceLoader: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOperators.pending, (state, action) => {
      state.operators.loading = true;
    });
    builder.addCase(getOperators.fulfilled, (state, action) => {
      state.operators.operatorsList = action.payload;
      state.operators.loading = false;
    });
    builder.addCase(getOperators.rejected, (state, action) => {
      state.operators.loading = false;
      state.operators.error = action.error;
    });
    builder.addCase(finalRecharge.pending, (state, action) => {
      state.finalRecharge.loading = true;
    });
    builder.addCase(finalRecharge.fulfilled, (state, action) => {
      state.finalRecharge.rechargeData = action.payload;
      state.finalRecharge.loading = false;
    });
    builder.addCase(finalRecharge.rejected, (state, action) => {
      state.finalRecharge.loading = false;
      state.finalRecharge.error = action.error;
    });
    builder.addCase(getRechargeHistory.pending, (state, action) => {
      state.rechargeHistory.loading = true;
    });
    builder.addCase(getRechargeHistory.fulfilled, (state, action) => {
      state.rechargeHistory.rechargeHistoryList = action.payload;
      state.rechargeHistory.loading = false;
    });
    builder.addCase(getRechargeHistory.rejected, (state, action) => {
      state.rechargeHistory.loading = false;
      state.rechargeHistory.error = action.error;
    });
    builder.addCase(getServiceDiscounts.pending, (state, action) => {
      state.serviceDiscount.spLoading = true;
    });
    builder.addCase(getServiceDiscounts.fulfilled, (state, action) => {
      state.serviceDiscount.discount = action.payload;
      state.serviceDiscount.spLoading = false;
    });
    builder.addCase(getServiceDiscounts.rejected, (state, action) => {
      state.serviceDiscount.spLoading = false;
      state.serviceDiscount.error = action.error;
    });
    builder.addCase(getServiceName.pending, (state, action) => {
      state.ServiceName.ServiceLoader = true;
    });
    builder.addCase(getServiceName.fulfilled, (state, action) => {
      state.ServiceName.ServiceData = action.payload;
      state.ServiceName.ServiceLoader = false;
    });
  },
});

export default commonSlice.reducer;
