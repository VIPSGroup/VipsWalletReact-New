import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  appType,
  currAppVersion,
  digiBaseUrl,
  digitPrecision,
} from "../../../../constants";
export const DigiGiftSend = async ({
  senderUsername,
  Password,
  otp,
  formvalue,
}) => {
  // const amount = digitPrecision(formvalue.valueinAmt, "amount");
  console.log(formvalue.metalType, "formvalue.metalType");
  const formData = new FormData();
  formData.append("senderUsername", senderUsername);
  formData.append("Password", Password);
  formData.append("receiverUserName", formvalue.receiverUserName);
  formData.append("metalType", formvalue.metalType);
  formData.append("quantity", formvalue.valueinGm);
  formData.append("otp", otp || "");
  formData.append("AppType", appType);
  formData.append("currentAppVersion", currAppVersion);

  try {
    const res = await axios.post(`${digiBaseUrl}TransferGoldSilver`, formData);
    return res.data;
  } catch (error) {
    return error;
  }
};

const DigiGiftSlice = createSlice({
  name: "DigiGiftSlice",
  initialState: {},
});
export default DigiGiftSlice.reducer;
