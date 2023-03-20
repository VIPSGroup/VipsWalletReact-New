import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl } from "../../../constants";

export const updateProfile = (userData) => {
  const formData = new FormData();

  formData.append("UserName", userData?.username);
  formData.append("Password", userData?.password);
  formData.append("FName", userData.FName);
  formData.append("LName", userData.LName);
  formData.append("Mobile", userData.Mobile);
  formData.append("EmailId", userData.EmailId);
  formData.append("Pancard", userData.Pancard);
  formData.append("Address", userData.Address);
  formData.append("StateId", userData.StateId);
  formData.append("CityId", userData.CityId);
  formData.append("AadharNo", userData.AadharNo);
  formData.append("PincodeId", userData.Pincode);
  formData.append("AlternateMobile", userData.AlternateMobile);

  return fetch(`${baseApiUrl}/UserServices/GetUpdateUser`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
export const changePassword = createAsyncThunk(
  "changePassword",
  async ({ Mobile, Password, newPassword }, thunkAPI) => {
    const formData = new FormData();
    formData.append("UserName", Mobile);
    formData.append("Password", Password);
    formData.append("NewPassword", newPassword);
    try {
      const res = await axios.post(
        `${baseApiUrl}/UserServices/GetChangePassword`,
        formData
      );
      return res.data;
    } catch (error) {}
  }
);
// export const changePassword = async (username, oldPass, newPass) => {
//   const formData = new FormData();
//   formData.append("UserName", username);
//   formData.append("Password", oldPass);
//   formData.append("NewPassword", newPass);
//   try {
//     const res = await axios.post(
//       `${baseApiUrl}/UserServices/GetChangePassword`,
//       formData
//     );
//     return res.data;
//   } catch (error) {}

//   // return fetch(`${baseApiUrl}/UserServices/GetChangePassword`, {
//   //   method: "POST",
//   //   body: formData,
//   // })
//   //   .then((data) => {
//   //     return data.json();
//   //   })
//   //   .catch((err) => {});
// };
export const getProfileDetails = ({username, password}) => {
  const formData = new FormData();
  formData.append("UserName", username);
  formData.append("Password", password);

  return fetch(`${baseApiUrl}/UserServices/GetUserProfileDetails`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState: {
    changePass: {
      success: false,
      loading: false,
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changePassword.pending, (state, action) => {
      state.changePass.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.changePass.success = action.payload;
      state.changePass.loading = false;
    });
  },
});

export default profileSlice.reducer;
