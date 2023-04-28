import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { appType, baseApiUrl, getDouble } from "../../../constants";

export const getActiveApi = createAsyncThunk(
  "getActiveApi",
  async () => {
    try {
      const res = await axios.get(
        `${baseApiUrl}/PlanServices/GetBrowsPlanAPI`
      );
      return res.data.Data.find(item=>item.Status===true)
    } catch (error) {
      return error;
    }
  }
);

export const getRechargeCircleList = createAsyncThunk(
  "getRechargeCircleList",
  async () => {
    try {
      const res = await axios.post(
        `${baseApiUrl}/PlanServices/GetRechargeCircle` );
      return res.data.Data
    } catch (error) {
      return error;
    }
  }
);

export const getCircleAndOperatorByNumber = createAsyncThunk(
  "getCircleAndOperatorByNumber",
  async (mobileNo) => {
    const formData = new FormData();
    formData.append("MobileNumber", mobileNo);
    try {
      const res = await axios.post(
        `${baseApiUrl}/PlanServices/GetCircleAndOperatorByNumberSeries`,formData);
      return res.data.Data
    } catch (error) {
      return error;
    }
  }
);
export const billAvenueBrowsePlans = createAsyncThunk(
  "billAvenueBrowsePlans",
  async ({circle,operator}) => {
    const formData = new FormData();
    formData.append("circle", circle);
    formData.append("billerId", operator);  
    try {
      const res = await axios.post(
        `${baseApiUrl}/PlanServices/GetBrowsPlans`,formData);
      return res.data.Data.rechargePlanResponse.rechargePlan.rechargePlansDetails
    } catch (error) {
      return error;
    }
  }
);
export const getMobileRechargePlans = createAsyncThunk(
  "getMobileRechargePlans",
  async ({circleName,operatorName}) => {
    const formData = new FormData();
    formData.append("CircleName", circleName);
    formData.append("OperatorName", operatorName);
    try {
      const res = await axios.post(
        `${baseApiUrl}/PlanServices/GetMobileRechargePlans`,formData);
      return res.data.Data.records
    } catch (error) {
      return error;
    }
  }
);

export const getSpecialMobileRechargePlans = createAsyncThunk(
  "getSpecialMobileRechargePlans",
  async ({operatorName, mobileNo}) => {
    const formData = new FormData();
    formData.append("OperatorName", operatorName);
    formData.append("Mobile", mobileNo);
    try {
      const res = await axios.post(
        `${baseApiUrl}/PlanServices/GetSpecialMobileRechargePlans`,formData);
      return res.data.Data.records
    } catch (error) {
      return error;
    }
  }
);


const rechargeSlice = createSlice({
  name: "rechargeSlice",
  initialState: {
    browsePlan: {
      browseApi: {},
      loading: false,
      error: "",
    },
    mobileOperator: {
      loading: false,
      operatorsList: [],
      error: "",
    },
    rechargeCircle: {
      loading: false,
      rechargeCircleList: [],
      error: "",
    },
    circleAndOperatorByNumber: {
      loading: false,
      circleAndOperator: {},
      error: "",
    },
    billAvenueBrowsePlans: {
      loading: false,
      billAvenuePlans: [],
      error: "",
    },
    mobileRechargePlans:{
      loading: false,
      rechargePlans: [],
      error: "",
    },
    specialRechargePlans:{
      spLoading: false,
      specialPlans: [],
      error: "",
    }
  },
  reducers: {},
  extraReducers: (builder) => {
        builder.addCase(getActiveApi.pending, (state, action) => {state.browsePlan.loading = true; });
    builder.addCase(getActiveApi.fulfilled, (state, action) => {
      state.browsePlan.browseApi =action.payload;
      state.browsePlan.loading = false;
    });
    builder.addCase(getActiveApi.rejected, (state, action) => {
      state.browsePlan.loading = false;
      state.browsePlan.error = action.error;
    });
        builder.addCase(getRechargeCircleList.pending, (state, action) => {
      state.rechargeCircle.loading = true;
    });
    builder.addCase(getRechargeCircleList.fulfilled, (state, action) => {
      state.rechargeCircle.rechargeCircleList =action.payload;
      state.rechargeCircle.loading = false;
    });
    builder.addCase(getRechargeCircleList.rejected, (state, action) => {
      state.rechargeCircle.loading = false;
      state.rechargeCircle.error = action.error;
    });
        builder.addCase(getCircleAndOperatorByNumber.pending, (state, action) => {
      state.circleAndOperatorByNumber.loading = true;
    });
    builder.addCase(getCircleAndOperatorByNumber.fulfilled, (state, action) => {
      state.circleAndOperatorByNumber.circleAndOperator =action.payload;
      state.circleAndOperatorByNumber.loading = false;
    });
    builder.addCase(getCircleAndOperatorByNumber.rejected, (state, action) => {
      state.circleAndOperatorByNumber.loading = false;
      state.circleAndOperatorByNumber.error = action.error;
    });
        builder.addCase(billAvenueBrowsePlans.pending, (state, action) => {
      state.billAvenueBrowsePlans.loading = true;
    });
    builder.addCase(billAvenueBrowsePlans.fulfilled, (state, action) => {
      state.billAvenueBrowsePlans.billAvenuePlans =action.payload;
      state.billAvenueBrowsePlans.loading = false;
    });
    builder.addCase(billAvenueBrowsePlans.rejected, (state, action) => {
      state.billAvenueBrowsePlans.loading = false;
      state.billAvenueBrowsePlans.error = action.error;
    });
        builder.addCase(getMobileRechargePlans.pending, (state, action) => {
      state.mobileRechargePlans.loading = true;
    });
    builder.addCase(getMobileRechargePlans.fulfilled, (state, action) => {
      state.mobileRechargePlans.rechargePlans =action.payload;
      state.mobileRechargePlans.loading = false;
    });
    builder.addCase(getMobileRechargePlans.rejected, (state, action) => {
      state.mobileRechargePlans.loading = false;
      state.mobileRechargePlans.error = action.error;
    });
        builder.addCase(getSpecialMobileRechargePlans.pending, (state, action) => {
      state.specialRechargePlans.spLoading = true;
    });
    builder.addCase(getSpecialMobileRechargePlans.fulfilled, (state, action) => {
      state.specialRechargePlans.specialPlans =action.payload;
      state.specialRechargePlans.spLoading = false;
    });
    builder.addCase(getSpecialMobileRechargePlans.rejected, (state, action) => {
      state.specialRechargePlans.spLoading = false;
      state.specialRechargePlans.error = action.error;
    });
  },
});

export default rechargeSlice.reducer;
