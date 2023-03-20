import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { appType, baseApiUrl } from "../../../constants";

export const getWalletBalance = createAsyncThunk(
  "getWalletBalance",
  async ({ username, password }, thunkAPI) => {
    const formData = new FormData();
    formData.append("UserName", username);
    formData.append("Password", password);
    try {
      const res = await axios.post(
        `${baseApiUrl}/Recharge/GetCheckBalance`,
        formData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const checkGABBalance = createAsyncThunk(
  "checkGABBalance",
  async ({ username, password }, thunkAPI) => {
    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);
    try {
      const res = await axios.post(
        `${baseApiUrl}/UserServices/GetHolidayBalance`,
        formData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const addMoneyFromGAB = createAsyncThunk(
  "addMoneyFromGAB",
  async (username, password, amount) => {
    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);
    formData.append("Amount", amount);
    formData.append("PayType", "VIPSHOLIDAY");
    try {
      const res = await axios.post(
        `${baseApiUrl}/RequestService/GetWithdrawByVips`,
        formData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const sendMoneyOtp = (userName, password, recieverNo, amount) => {
  const formData = new FormData();

  formData.append("UserName", userName);
  formData.append("Password", password);
  formData.append("CrUserName", recieverNo);
  formData.append("Amount", amount);
  formData.append("Remarks", "");
  formData.append("Token", "ouehdjdj78wg4772bbdbdf35d9ad4a5");
  formData.append("Otp", "");
  formData.append("AppType", appType);

  return fetch(`${baseApiUrl}/RequestService/GetUserToUserTransfer`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${userName}:${password}`),
    },
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
export const sendMoney = (userName, password, recieverNo, amount, otp) => {
  const formData = new FormData();

  formData.append("UserName", userName);
  formData.append("Password", password);
  formData.append("CrUserName", recieverNo);
  formData.append("Amount", amount);
  formData.append("Remarks", "");
  formData.append("Token", "ouehdjdj78wg4772bbdbdf35d9ad4a5");
  formData.append("Otp", otp);
  formData.append("AppType", appType);
  var headers = new Headers();

  return fetch(`${baseApiUrl}/RequestService/GetUserToUserTransfer`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${userName}:${password}`),
    },
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
export const finstocTradePriceCheck = createAsyncThunk(
  "finstocTradePriceCheck",
  async (username, password) => {
    const data = {
      UserName: username,
      Password: password,
    };
    try {
      const res = await fetch(
        `${baseApiUrl}/RequestService/VIPSFINSTOCK_RECENT_TRADES_RATE`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(`${username}:${password}`),
          },
          body: JSON.stringify(data),
        }
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const becomePrime = (username, password) => {
  const formData = new FormData();
  formData.append("UserName", username);
  formData.append("Password", password);
  formData.append("PayType", "App_Wallet");

  return fetch(`${baseApiUrl}/CardServices/PurchaseShoppingcard`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

const walletSlice = createSlice({
  name: "walletSlice",
  initialState: {
    walletBalance: {
      data: [],
      loading: false,
      error: "",
    },
    GABBalance: {
      data: [],
      loading: false,
      error: "",
    },
    addMoney: {
      data: [],
      loading: false,
      error: "",
    },
    finstockPrice: {
      data: [],
      loading: false,
      error: "",
    },
    primeMember: {
      primeData: [],
      loading: false,
      error: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWalletBalance.pending, (state, action) => {
      state.walletBalance.loading = true;
    });
    builder.addCase(getWalletBalance.fulfilled, (state, action) => {
      state.walletBalance.data = action.payload;
      state.walletBalance.loading = false;
    });
    builder.addCase(getWalletBalance.rejected, (state, action) => {
      state.walletBalance.error = action.error;
    });
    // Check GAB Balance
    builder.addCase(checkGABBalance.pending, (state, action) => {
      state.GABBalance.loading = true;
    });
    builder.addCase(checkGABBalance.fulfilled, (state, action) => {
      state.GABBalance.data = action.payload;
      state.GABBalance.loading = false;
    });
    builder.addCase(checkGABBalance.rejected, (state, action) => {
      state.GABBalance.error = action.error;
    });
    // Add Money From GAB
    builder.addCase(addMoneyFromGAB.pending, (state, action) => {
      state.addMoney.loading = true;
    });
    builder.addCase(addMoneyFromGAB.fulfilled, (state, action) => {
      state.addMoney.data = action.payload;
      state.addMoney.loading = false;
    });
    builder.addCase(addMoneyFromGAB.rejected, (state, action) => {
      state.addMoney.error = action.error;
    });
    // Finstock Price
    builder.addCase(finstocTradePriceCheck.pending, (state, action) => {
      state.finstockPrice.loading = true;
    });
    builder.addCase(finstocTradePriceCheck.fulfilled, (state, action) => {
      state.finstockPrice.data = action.payload;
      state.finstockPrice.loading = false;
    });
    builder.addCase(finstocTradePriceCheck.rejected, (state, action) => {
      state.finstockPrice.error = action.error;
    });
  },
});

export default walletSlice.reducer;
