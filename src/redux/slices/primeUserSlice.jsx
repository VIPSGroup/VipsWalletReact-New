import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl } from "../../constants";

export const checkPrime = ({userName, password}) => {
    const formData = new FormData();
    formData.append("UserName", userName);
    formData.append("Password", password);
    try {
      return fetch(`${baseApiUrl}/CardServices/ShoppingcardDetails`, {
        method: "POST",
        body: formData,
      })
        .then((data) => {
          return data.json();
        })
        .catch((err) => {});
    } catch (error) {
      return error;
    }
  }
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
const primeUserSlice = createSlice({
  name: "primeUserSlice",
  initialState: {
    checkPrimeUser: {
      data: [],
      loading: false,
      error: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
  },
});

export default primeUserSlice.reducer;
