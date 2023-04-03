import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl } from "../../../constants";

export const getStateCity = (pincode) => {
  const formData = new FormData();
  formData.append("pincode", pincode);
  formData.append("PayType", "App_Wallet");

  return fetch(`${baseApiUrl}/UserServices/GetCityAndStateByPincode`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      console.log(data);
      return data.json();
    })
    .catch((err) => {});
};


// export const getStateCity = createAsyncThunk(
//   "getStateCity",
//   async (pincode,{getState}) => {
//     const formData = new FormData();
//     formData.append("pincode", pincode);
//     try {
//       const res = await axios.post(
//         `${baseApiUrl}/UserServices/GetCityAndStateByPincode`,
//         formData
//       );
//       return res.data
//     } catch (error) {
//       return error;
//     }
//   }
// );
export const getStateCityList = createAsyncThunk(
  "getStateCityList",
  async () => {
   
    try {
      const res = await axios.post(
        `${baseApiUrl}/UserServices/GetStatesList`
      );
      return res.data
    } catch (error) {
      return error;
    }
  }
);
export const validateReference = createAsyncThunk(
  "validateReference",
  async (refId) => {
    const formData = new FormData();
    formData.append("RefID", refId);
    try {
      const res = await axios.post(
        `${baseApiUrl}/UserServices/GetIsValidateReference`,
        formData
      );
      
      return res.data
    } catch (error) {
      return error;
    }
  }
);
export const signUpWithOtp = createAsyncThunk(
  "signUpWithOtp",
  async ({userName,emailId},{getState}) => {
 
    const formData = new FormData();
  formData.append("MobileNo", userName);
  formData.append("CountryCode", "244");
  formData.append("RefeId", "");
  formData.append("Country", "India");
  formData.append("emailid", emailId);
    try {
      const res = await axios.post(
        `${baseApiUrl}/UserServices/GetSendOTPforAddUser`,
        formData
      );
     
      return res.data
    } catch (error) {
      return error;
    }
  }
);
export const signUpUser = createAsyncThunk(
  "signUpUser",
  async ({fName,lName,emailId,userName,password,RefId,Otp,stateId,cityId,pincodeId,Ip},{getState}) => {
    const {loginSlice :{loggetInWithOTP:{loggedInUser}  } }=getState();
    const formData = new FormData();
    formData.append("FName", fName);
    formData.append("LName", lName);
    formData.append("EmailId", emailId);
    formData.append("UserName", userName);
    formData.append("Password", password);
    formData.append("MobileNo", userName);
    formData.append("RefeId", RefId);
    formData.append("UserType", "Member");
    formData.append("OTP", Otp);
    formData.append("StateId", stateId);
    formData.append("CityId", cityId);
    formData.append("AreaId", pincodeId);
    formData.append("IMEI", Ip);
    formData.append("EarnAndReferFlag", RefId ? 1 : 0);
    formData.append("SIDE", "");
    formData.append("CountryCode", "244");
    formData.append("Country", "India");
    formData.append("AppType", "IOS");
    try {
      const res = await axios.post(
        `${baseApiUrl}/UserServices/GetAddNewUservips`,
        formData
      );
      if(res.data.ResponseStatus==1){
        localStorage.setItem("user",JSON.stringify(res.data.Data))
       }
      return res.data
    } catch (error) {
      return error;
    }
  }
);
const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState: {
    validateNumber: {
      validateNo: {},
      loading: false,
      error: "",
    },
    stateCityPincode:{
      stateCityByPincode: {},
      loading: false,
      error: "",
    },
    stateList:{
      allStateCityList: [],
      loading: false,
      error: "",
    },
     signUpOtp:{
      response: '',
      loading: false,
      error: "",
    },
     signUp:{
      newUser: '',
      otploading: false,
      error: "",
    }
  },
  reducers: {
    stateCityEmpty:(state,action)=>{
state.stateCityPincode.stateCityByPincode={}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(validateReference.pending, (state, action) => {
      state.validateNumber.loading = true;
    });
    builder.addCase(validateReference.fulfilled, (state, action) => {
      state.validateNumber.validateNo = action.payload;
      state.validateNumber.loading = false;
    });
    builder.addCase(validateReference.rejected, (state, action) => {
      state.validateNumber.loading = false;
      state.validateNumber.error = action.error;
    });
    builder.addCase(getStateCityList.pending, (state, action) => {
      state.stateList.loading = true;
    });
    builder.addCase(getStateCityList.fulfilled, (state, action) => {
      state.stateList.allStateCityList = action.payload;
      state.stateList.loading = false;
    });
    builder.addCase(getStateCityList.rejected, (state, action) => {
      state.stateList.loading = false;
      state.stateList.error = action.error;
    });
    builder.addCase(signUpWithOtp.pending, (state, action) => {
      state.signUpOtp.loading = true;
    });
    builder.addCase(signUpWithOtp.fulfilled, (state, action) => {
      state.signUpOtp.response = action.payload;
      state.signUpOtp.loading = false;
    });
    builder.addCase(signUpWithOtp.rejected, (state, action) => {
      state.signUpOtp.loading = false;
      state.signUpOtp.error = action.error;
    });
    builder.addCase(signUpUser.pending, (state, action) => {
      state.signUp.otploading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.signUp.newUser = action.payload;
      state.signUp.otploading = false;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.signUp.otploading = false;
      state.signUp.error = action.error;
    });
  },
});
export const {stateCityEmpty}=signUpSlice.actions
export default signUpSlice.reducer;
