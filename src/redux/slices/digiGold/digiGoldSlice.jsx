import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { appType, digiBaseUrl } from "../../../constants";

export const fetchGoldSilverRates = createAsyncThunk(
  "fetchGoldSilverRates",
  async () => {
    console.log("ye Main Func hai")
    try {
      const res = await axios.post(`${digiBaseUrl}GetGoldSilverRates`);
      return res.data;
    } catch (error) {}
  }
);
export const GetUserBankList = createAsyncThunk(
  "GetUserBankList",
  async ({ username, password }, thunkAPI) => {
    const formData = new FormData();
    formData.append("UserName", username);
    formData.append("Password", password);
    try {
      const res = await axios.post(`${digiBaseUrl}GetUserBankList`, formData);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const BuyDigiGold = async ({
  username,
  password,
  lockPrice,
  metalType,
  quantity,
  blockid,
  amount,
  type,
}) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("lockPrice", lockPrice);
  formData.append("metalType", metalType);
  formData.append("quantity", quantity);
  formData.append("blockId", blockid);
  formData.append("AppType", appType);
  formData.append(
    "modeOfTransaction",
    type === "Grams" ? "quantity" : "amount"
  );
  formData.append("amount", amount);

  try {
    const res = await axios.post(`${digiBaseUrl}BuyDigiGold`, formData);
    return res.data;
  } catch (error) {}
};
export const SellDigiGold = async ({
  username,
  password,
  lockPrice,
  metalType,
  quantity,
  blockid,
  userBankId,
  accountName,
  ifscCode,
  OTP,
}) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("lockPrice", lockPrice);
  formData.append("metalType", metalType);
  formData.append("quantity", quantity);
  formData.append("blockId", blockid);
  formData.append("userBankId", userBankId);
  formData.append("AppType", appType);

  // formData.append("accountName", accountName);
  // formData.append("ifscCode", ifscCode);
  formData.append("otp", OTP);

  try {
    const res = await axios.post(`${digiBaseUrl}SellDigiGold`, formData);
    return res.data;
  } catch (error) {}
};
export const UserbankAccountCreate = async ({
  username,
  password,
  accountNumber,
  accountName,
  ifscCode,
}) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("accountNumber", accountNumber);
  formData.append("accountName", accountName);
  formData.append("ifscCode", ifscCode);
  formData.append("status", "active");

  try {
    const res = await axios.post(
      `${digiBaseUrl}UserbankAccountCreate`,
      formData
    );
    return res.data;
  } catch (error) {}
};
export const UpdateBankAccountDetails = async ({
  username,
  password,
  accountNumber,
  accountName,
  ifscCode,
  user_bank_id,
}) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("accountNumber", accountNumber);
  formData.append("accountName", accountName);
  formData.append("ifscCode", ifscCode);
  formData.append("user_bank_id", user_bank_id);
  formData.append("status", "active");

  try {
    const res = await axios.post(
      `${digiBaseUrl}UpdateBankAccountDetails`,
      formData
    );
    return res.data;
  } catch (error) {}
};

export const startFetchData = () => (dispatch) => {
  setInterval(() => {
    dispatch(fetchGoldSilverRates());
  }, 60000); // call every 1 minute (60 seconds)
};

const digiGoldSlice = createSlice({
  name: "digiGoldSlice",
  initialState: {
    modal: {
      modalBool: false,
    },
    rates: {
      rateData: "",
      loading: false,
      error: "",
    },
    bankList: {
      list: "",
      loading: false,
      error: "",
    },
  },
  reducers: {
    modalOpen: (state, action) => {
      state.modal.modalBool = true;
    },
    modalClose: (state, action) => {
      state.modal.modalBool = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoldSilverRates.pending, (state, action) => {
      state.rates.loading = true;
    });
    builder.addCase(fetchGoldSilverRates.fulfilled, (state, action) => {
      state.rates.rateData = action.payload;
      state.rates.loading = false;
    });
    builder.addCase(fetchGoldSilverRates.rejected, (state, action) => {
      state.rates.error = action.error;
      state.rates.loading = false;
    });
    builder.addCase(GetUserBankList.pending, (state, action) => {
      state.bankList.loading = true;
    });
    builder.addCase(GetUserBankList.fulfilled, (state, action) => {
      state.bankList.list = action.payload;
      state.bankList.loading = false;
    });
    builder.addCase(GetUserBankList.rejected, (state, action) => {
      state.bankList.error = action.error;
      state.bankList.loading = false;
    });
  },
});
export const { modalOpen, modalClose } = digiGoldSlice.actions;
export default digiGoldSlice.reducer;
