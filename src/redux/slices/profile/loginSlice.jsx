import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl } from "../../../constants";

let user = localStorage.getItem("user") ? localStorage.getItem("user") : null;

export const checkUserExist = createAsyncThunk(
  "checkUserExist",
  async ({ username }) => {
    const formData = new FormData();
    formData.append("Username", username);
    try {
      const res = await axios.post(
        `${baseApiUrl}/UserServices/CheckUserRegistration`,
        formData
      );
      return [res.data, username];
      //   return res.data.Data;
    } catch (error) {
      return error;
    }
  }
);
export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ userName, password, ip }) => {
    const formData = new FormData();
    formData.append("Username", userName);
    formData.append("Password", password);
    formData.append("IP", ip || "103");
    formData.append("AppType", "Web");
    try {
      const res = await axios.post(
        `${baseApiUrl}/UserServices/GetLoginDetailsnew`,
        formData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async ({ userName }) => {
    const formData = new FormData();
    formData.append("Username", userName);
    try {
      const res = await axios.post(
        `${baseApiUrl}/UserServices/GetForgotPassword`,
        formData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const loginWithOtp = createAsyncThunk(
  "loginWithOtp",
  async ({ userName, password, ip, otp }) => {
    const formData = new FormData();
    formData.append("Username", userName);
    formData.append("Password", password);
    formData.append("IP", ip || "103");
    formData.append("OTP", otp);
    try {
      const res = await axios.post(
        `${baseApiUrl}/UserServices/PostVerifyLogin`,
        formData
      );
      let response;
      if (res.data.ResponseStatus === 0) {
        response = false;
      } else {
        response = res.data.Data;
        localStorage.setItem("user", JSON.stringify(res.data.Data));
      }
      return response;
    } catch (error) {
      return error;
    }
  }
);
const initialState= {
  checkUser: {
    isUserExist: [],
    loading: false,
    error: "",
  },
  loginUser: {
    logLoading: false,
    response: "",
    error: "",
  },
  forgotPass: {
    forgotLoading: false,
    forgotPassData: "",
    error: "",
  },
  loggetInWithOTP: {
    loggedInUser: JSON.parse(user),
    loggedLoading: false,
    toggle: "",
    error: "",
  },
}
const loginSlice = createSlice({
  name: "loginSlice",
 initialState,
  reducers: {
    resetState:(state)=>{return initialState},
    getLoggedInUser:(state)=>{console.log(JSON.stringify(state.loggetInWithOTP.loggedInUser))
      // ...state,
      state.loggetInWithOTP.loggedInUser=localStorage.getItem("user")
    }
  },
  extraReducers: (builder) => {
    // Check User Exist
    builder.addCase(checkUserExist.pending, (state, action) => {
      state.checkUser.loading = true;
    });
    builder.addCase(checkUserExist.fulfilled, (state, action) => {
      state.checkUser.isUserExist = action.payload;
      state.checkUser.loading = false;
    });
    builder.addCase(checkUserExist.rejected, (state, action) => {
      //   state.checkUser.isUserExist = action.error;
      state.checkUser.loading = false;
      state.checkUser.error = action.error;
    });

    // Login User
    builder.addCase(loginUser.pending, (state, action) => {
      state.loginUser.logLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginUser.response = action.payload;
      state.loginUser.logLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginUser.error = action.error;
      state.loginUser.logLoading = false;
    });

    // Forgot Password
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.forgotPass.forgotLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.forgotPass.forgotPassData = action.payload;
      state.forgotPass.forgotLoading = false;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.forgotPass.error = action.error;
      state.forgotPass.forgotLoading = false;
    });

    // Login With OTP
    builder.addCase(loginWithOtp.pending, (state, action) => {
      state.loggetInWithOTP.loggedLoading = true;
      state.loggetInWithOTP.loggedInUser = false;
      state.loggetInWithOTP.toggle = false;
    });
    builder.addCase(loginWithOtp.fulfilled, (state, action) => {
      state.loggetInWithOTP.loggedInUser = action.payload;
      state.loggetInWithOTP.loggedLoading = false;
      state.loggetInWithOTP.toggle = true;
    });
    builder.addCase(loginWithOtp.rejected, (state, action) => {
      state.loggetInWithOTP.error = action.error;
      state.loggetInWithOTP.loggedLoading = false;
    });
  },
});
export const { resetState,getLoggedInUser } = loginSlice.actions;
export default loginSlice.reducer;
