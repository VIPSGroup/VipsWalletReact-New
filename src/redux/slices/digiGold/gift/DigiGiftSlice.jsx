import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  appType,
  currAppVersion,
  currentAppVersion,
  digiBaseUrl,
  digitPrecision,
} from "../../../../constants";
export const DigiGiftSend = async ({
  senderUsername,
  Password,
  otp,
  valueType,
  receiverUserName,
}) => {
  // const amount = digitPrecision(formvalue.valueinAmt, "amount");
  const formData = new FormData();
  formData.append("senderUsername", senderUsername);
  formData.append("Password", Password);
  formData.append("receiverUserName", receiverUserName);
  formData.append("metalType", valueType.metalType);
  formData.append("quantity", valueType.valueinGm);
  formData.append("otp", otp || "");
  formData.append("AppType", appType);
  formData.append("currentAppVersion", currentAppVersion);

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
