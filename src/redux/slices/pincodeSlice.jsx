import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl } from "../../constants";

export const checkPinCode = createAsyncThunk(
  "checkPinCode",
  async ({ pincode, productId }) => {
    const formData = new FormData();
    formData.append("ProductId", productId);
    formData.append("Pincode", pincode);
    try {
      const res = await axios.post(
        `${baseApiUrl}/EcommerceServices/Validatepincode`,
        formData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getAddress = createAsyncThunk(
  "getAddress",
  async ({ Mobile, TRXNPassword }, thunkAPI) => {
    const formData = new FormData();
    formData.append("UserName", Mobile);
    formData.append("password", TRXNPassword);
    try {
      const res = await axios.post(
        `${baseApiUrl}/EcommerceServices/GetShippingAddress`,
        formData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const deleteAddress = createAsyncThunk(
  "deleteAddress",
  async ({ addressId, Mobile, TRXNPassword }, thunkAPI) => {
    const formData = new FormData();
    formData.append("UserName", Mobile);
    formData.append("password", TRXNPassword);
    formData.append("addressid", addressId);
    const data = {
      Addressid: addressId,
      UserName: Mobile,
      Password: TRXNPassword,
    };
    var json = JSON.stringify(data);
    try {
      const res = await axios.post(
        `${baseApiUrl}/EcommerceServices/DeleteShippingAddress`,
        json
      );
      thunkAPI.dispatch(getAddress({ Mobile, TRXNPassword }));
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const updateAddress = createAsyncThunk(
  "updateAddress",
  async ({ addressData, username, password, state, city }, thunkAPI) => {
    const data = {
      Fname: addressData.fname,
      Lname: addressData.lname,
      Mobileno: addressData.mobileno,
      City: city,
      State: state,
      AddressType: addressData.addressType,
      Address: addressData.address,
      Pincode: addressData.pincode,
      Landmark: addressData.landmark,
      UserName: username,
      Password: password,
      Addressid: addressData.addressId,
    };

    var json = JSON.stringify(data);
    try {
      const res = await axios.post(
        `${baseApiUrl}/EcommerceServices/UpdateShippingAddress`,
        json
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const addAddress = (addressData, username, password, state, city) => {
  const data = {
    Fname: addressData.fname,
    Lname: addressData.lname,
    Mobileno: addressData.mobileno,
    City: city,
    State: state,
    AddressType: addressData.addressType,
    Address: addressData.address,
    Pincode: addressData.pincode,
    Landmark: addressData.landmark,
    UserName: username,
    Password: password,
    Addressid: "0",
  };
  var json = JSON.stringify(data);

  return fetch(`${baseApiUrl}/EcommerceServices/AddShippingAddress`, {
    method: "POST",
    body: json,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

const pincodeSlice = createSlice({
  name: "pincodeSlice",
  initialState: {
    pinCode: {
      data: [],
      loading: false,
      error: "",
    },
    AddressGet: {
      data: [],
      loading: false,
      error: "",
    },
    addressDelete: {
      data: [],
      loading: false,
      error: "",
    },
    addressUpdate: {
      data: [],
      loading: false,
      error: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // Pin Code Check
    builder.addCase(checkPinCode.pending, (state, action) => {
      state.pinCode.loading = true;
    });
    builder.addCase(checkPinCode.fulfilled, (state, action) => {
      state.pinCode.data = action.payload;
      state.pinCode.loading = false;
    });
    builder.addCase(checkPinCode.rejected, (state, action) => {
      state.pinCode.error = action.error;
    });
    // get Address
    builder.addCase(getAddress.pending, (state, action) => {
      state.AddressGet.loading = true;
    });
    builder.addCase(getAddress.fulfilled, (state, action) => {
      state.AddressGet.data = action.payload;
      state.AddressGet.loading = false;
    });
    builder.addCase(getAddress.rejected, (state, action) => {
      state.AddressGet.error = action.error;
    });
    // Deelte Address
    builder.addCase(deleteAddress.pending, (state, action) => {
      state.addressDelete.loading = true;
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.addressDelete.data = action.payload;
      state.addressDelete.loading = false;
    });
    builder.addCase(deleteAddress.rejected, (state, action) => {
      state.addressDelete.error = action.error;
    });
    // Update Address
    builder.addCase(updateAddress.pending, (state, action) => {
      state.addressUpdate.loading = true;
    });
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      state.addressUpdate.data = action.payload;
      state.addressUpdate.loading = false;
    });
    builder.addCase(updateAddress.rejected, (state, action) => {
      state.addressUpdate.error = action.error;
    });
  },
});

export default pincodeSlice.reducer;
