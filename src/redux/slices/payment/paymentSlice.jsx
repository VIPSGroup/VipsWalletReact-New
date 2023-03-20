import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { appType, baseApiUrl } from "../../../constants";

export const getPayUHash = async (user, transactionId, amount) => {
  const formData = new FormData();
  const fname = user?.Name?.split(" ")[0];
  formData.append("txnid", transactionId);
  formData.append("amount", amount);
  formData.append("productinfo", "AddMoney");
  formData.append("firstname", fname);
  formData.append("email", user.Emailid);
  formData.append("user_credentials", "e9ZmdY:" + user.UserName);
  formData.append("chargesAmount", 1.0);
  formData.append("transactionType", "ADD_MONEY");
  formData.append("currentAppVersion", 10.26);
  formData.append("AppType", appType);

  try {
    const res = await axios.post(`${baseApiUrl}/payuhash`, formData);
    return res.data;
  } catch (error) {}
};

// export const finstockGenerateOtp = createAsyncThunk(
//   "finstockGenerateOtp",
//   async ({ Mobile, Password, email, coins }, thunkAPI) => {
//     const data = {
//       UserName: Mobile,
//       Password: Password,
//       email: email,
//       VipsCoin: coins,
//     };

//     var json = JSON.stringify(data);
//     return fetch(`${baseApiUrl}/RequestService/VIPSFINSTOCK_GENERATE_OTP`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Basic " + btoa(`${Mobile}:${Password}`),
//       },
//       body: json,
//     })
//       .then((data) => {
//         return data.json();
//       })
//       .catch((err) => {});
//   }
// );

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
    finOtpGenerate: {
      formCount: 1,
      loading: false,
      error: "",
      taxId: "",
    },
  },
  extraReducers: (builder) => {
    builder.addCase(finstockGenerateOtp.pending, (state, action) => {
      state.finOtpGenerate.loading = true;
    });
    builder.addCase(finstockGenerateOtp.fulfilled, (state, action) => {
      if (action.payload.ResponseStatus === 1) {
        state.finOtpGenerate.formCount = 2;
        state.finOtpGenerate.loading = false;
        state.finOtpGenerate.error = "";
        state.finOtpGenerate.taxId = action.payload.Data.vipstxid;
        // setFormCount(2);
        // setLoading(false);
        // setError("");
        // setTaxId(response.Data.vipstxid);
      } else {
        state.finOtpGenerate.error = action.payload.Remarks;
        state.finOtpGenerate.loading = false;

        // setError(response.Remarks);
        // setLoading(false);
      }
    });
  },
});

export default paymentSlice.reducer;
