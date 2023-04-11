import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { appType, baseApiUrl } from "../../../constants";

export const getPayUHash = async (user, transactionId, amount,key,string) => {
  const formData = new FormData();
  const fname = user?.Name?.split(" ")[0];
  formData.append("txnid", transactionId);
  formData.append("amount", amount);
  formData.append("productinfo", "AddMoney");
  formData.append("firstname", fname);
  formData.append("email", user.Emailid);
  formData.append("user_credentials",`${key}:` + user.UserName);
  formData.append("chargesAmount", 1.0);
  formData.append("transactionType", "ADD_MONEY");
  formData.append("currentAppVersion", 10.26);
  formData.append("AppType", appType);

  try {
    let res 
    console.warn(string==="PAYUMONEY");
    if(string==="PAYUMONEY"){
      res= await axios.post(`${baseApiUrl}/PayUMoneyHash`, formData);
    }else{
      res= await axios.post(`${baseApiUrl}/payuhash`, formData);
    }
    return res.data;
  } catch (error) {}
};

export const globalConfiguration = createAsyncThunk(
  "globalConfiguration",
  async (type) => { 
    try {
     const res=  await axios({
          method: 'post',
          url:`${baseApiUrl}/GlobalConfiguration/GetConfigBySubKey`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Basic " + btoa("VipsWallet:vips@@1029")
        }, 
          data: {key:type}
        })
    return res.data
    } catch (error) {
      return error;
    }
  }
);

export const finstockGenerateOtp = (username, password, email, vipsCoin) => {
  const formData = new FormData();

  formData.append("UserName", username);
  formData.append("Password", password);
  formData.append("email", email);
  formData.append("VipsCoin", vipsCoin);

  const data = {
    UserName: username,
    Password: password,
    email: email,
    VipsCoin: vipsCoin,
  };

  var json = JSON.stringify(data);

  return fetch(`${baseApiUrl}/RequestService/VIPSFINSTOCK_GENERATE_OTP`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
    body: json,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
export const finstockAdd = (
  username,
  password,
  email,
  vipsCoin,
  otp,
  vipstxid
) => {
  const formData = new FormData();

  formData.append("username", username);
  formData.append("password", password);
  formData.append("email", email);
  formData.append("otp", otp);
  formData.append("VipsCoin", vipsCoin);
  formData.append("vipstxid", vipstxid);

  const data = {
    UserName: username,
    Password: password,
    email: email,
    VipsCoin: vipsCoin,
    otp: otp,
    vipstxid: vipstxid,
  };

  var json = JSON.stringify(data);

  return fetch(`${baseApiUrl}/RequestService/VIPSFINSTOCK_WITHDRAWALS`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
    body: json,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState: {
    // finOtpGenerate: {
    //   formCount: 1,
    //   loading: false,
    //   error: "",
    //   taxId: "",
    // },
    configBySubKey: {
      key:'',
      string:'',
      loading: false,
      data:{},
      error: "",
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(finstockGenerateOtp.pending, (state, action) => {
    //   state.finOtpGenerate.loading = true;
    // });
    // builder.addCase(finstockGenerateOtp.fulfilled, (state, action) => {
    //   if (action.payload.ResponseStatus === 1) {
    //     state.finOtpGenerate.formCount = 2;
    //     state.finOtpGenerate.loading = false;
    //     state.finOtpGenerate.error = "";
    //     state.finOtpGenerate.taxId = action.payload.Data.vipstxid;
    //     // setFormCount(2);
    //     // setLoading(false);
    //     // setError("");
    //     // setTaxId(response.Data.vipstxid);
    //   } else {
    //     state.finOtpGenerate.error = action.payload.Remarks;
    //     state.finOtpGenerate.loading = false;

    //     // setError(response.Remarks);
    //     // setLoading(false);
    //   }
    // });
    builder.addCase(globalConfiguration.pending, (state, action) => {
      state.configBySubKey.loading = true;
    });
    builder.addCase(globalConfiguration.fulfilled, (state, action) => {
      console.warn(action.payload);
      if(action.payload.ResponseStatus===1){
        if(action.payload.Data.Key){
          state.configBySubKey.key=action.payload.Data.Key
        }
        if(action.payload.Data.String!=="3"){
          state.configBySubKey.string=action.payload.Data.String
        }
      }
      state.configBySubKey.data = action.payload;
      state.configBySubKey.loading = false;
    });
    builder.addCase(globalConfiguration.rejected, (state, action) => {
      state.configBySubKey.error = action.error;
    })
  },
});

export default paymentSlice.reducer;
