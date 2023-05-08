import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { digiBaseUrl } from "../../../../constants";

export const getMetalProductlist = createAsyncThunk(
  "getMetalProductlist",
  async ({ page }, thunkAPI) => {
    const formData = new FormData();
    formData.append("page", page);
    formData.append("count", 20);
    try {
      const res = await axios.post(`${digiBaseUrl}GetProductList`, formData);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getMetalProductDetails = createAsyncThunk(
  "getMetalProductDetails",
  async ({ sku }, thunkAPI) => {
    const formData = new FormData();
    formData.append("sku", sku);
    try {
      const res = await axios.post(`${digiBaseUrl}ProductDetails`, formData);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getDigiAddressList = createAsyncThunk(
  "getDigiAddressList",
  async ({ Username, Password }) => {
    const formData = new FormData();
    formData.append("Username", Username);
    formData.append("Password", Password);
    try {
      const res = await axios.post(
        `${digiBaseUrl}GetUserAddressList`,
        formData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const createDigiAddress = createAsyncThunk(
  "createDigiAddress",
  async ({
    Username,
    Password,
    name,
    mobileNumber,
    email,
    address,
    pincode,
  }) => {
    const formData = new FormData();
    formData.append("Username", Username);
    formData.append("Password", Password);
    formData.append("name", name);
    formData.append("mobileNumber", mobileNumber);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("pincode", pincode);
    try {
      const res = await axios.post(`${digiBaseUrl}AddressCreate`, formData);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const deleteDigiAddress = createAsyncThunk(
  "deleteDigiAddress",
  async ({ Username, Password, Useraddressid }) => {
    const formData = new FormData();
    formData.append("Username", Username);
    formData.append("Password", Password);
    formData.append("Useraddressid", Useraddressid);
    try {
      const res = await axios.post(
        `${digiBaseUrl}DeleteUserAddressList`,
        formData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const checkDigiPinCode = createAsyncThunk(
  "checkDigiPinCode",
  async ({ pincode }, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

const DeliverySlice = createSlice({
  name: "DeliverySlice",
  initialState: {
    items: JSON.parse(localStorage.getItem("digiCart")) || [],

    totalAmount: 0,
    coinList: {
      list: "",
      listLoading: false,
    },
    coinDetails: {
      proDetails: "",
      proLoading: false,
      qtyMessage: "",
    },
    addressList: {
      address: "",
      addLoading: false,
    },
    pinCodeCheck: {
      pinCode: "",
      pinLoading: false,
    },
    createAdd: {
      AddRes: "",
      AddLoading: false,
    },
    deleteAdd: {
      AddDelete: "",
      AddDelLoading: false,
    },
  },

  reducers: {
    addItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.sku === action.payload.sku
      );
      if (index === -1) {
        state.items.push({ ...action.payload, quantity: 1 });
      } else {
        if (action.payload.stock > state.items[index].quantity) {
          state.items[index].quantity += 1;
        }
      }
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.sku === action.payload.sku
      );
      if (index !== -1) {
        if (state.items[index].quantity === 1) {
          state.items.splice(index, 1);
        } else {
          state.items[index].quantity -= 1;
        }
      }
    },
    deleteItem: (state, action) => {
      const products = JSON.parse(localStorage.getItem("digiCart"));
      const updatedProducts = products.filter(
        (product) => product.sku !== action.payload.sku
      );
      localStorage.setItem("digiCart", JSON.stringify(updatedProducts));
      state.items = updatedProducts;
    },
    removePinData: (state, action) => {
      state.pinCodeCheck.pinCode = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMetalProductlist.pending, (state, action) => {
      state.coinList.listLoading = true;
    });
    builder.addCase(getMetalProductlist.fulfilled, (state, action) => {
      state.coinList.list = action.payload;
      state.coinList.listLoading = false;
    });
    builder.addCase(getMetalProductlist.rejected, (state, action) => {
      state.coinList.listLoading = false;
    });
    builder.addCase(getMetalProductDetails.pending, (state, action) => {
      state.coinDetails.proLoading = true;
    });
    builder.addCase(getMetalProductDetails.fulfilled, (state, action) => {
      state.coinDetails.proDetails = action.payload;
      state.coinDetails.proLoading = false;
    });
    builder.addCase(getMetalProductDetails.rejected, (state, action) => {
      state.coinDetails.proLoading = false;
    });

    builder.addCase(getDigiAddressList.pending, (state, action) => {
      state.addressList.addLoading = true;
    });
    builder.addCase(getDigiAddressList.fulfilled, (state, action) => {
      state.addressList.address = action.payload;
      state.addressList.addLoading = false;
    });
    builder.addCase(getDigiAddressList.rejected, (state, action) => {
      state.addressList.addLoading = false;
    });

    builder.addCase(checkDigiPinCode.pending, (state, action) => {
      state.pinCodeCheck.pinLoading = true;
    });
    builder.addCase(checkDigiPinCode.fulfilled, (state, action) => {
      state.pinCodeCheck.pinCode = action.payload;
      state.pinCodeCheck.pinLoading = false;
    });
    builder.addCase(checkDigiPinCode.rejected, (state, action) => {
      state.pinCodeCheck.pinLoading = false;
    });

    builder.addCase(createDigiAddress.pending, (state, action) => {
      state.createAdd.AddLoading = true;
    });
    builder.addCase(createDigiAddress.fulfilled, (state, action) => {
      state.createAdd.AddRes = action.payload;
      state.createAdd.AddLoading = false;
    });
    builder.addCase(createDigiAddress.rejected, (state, action) => {
      state.createAdd.AddLoading = false;
    });

    builder.addCase(deleteDigiAddress.pending, (state, action) => {
      state.deleteAdd.AddDelLoading = true;
    });
    builder.addCase(deleteDigiAddress.fulfilled, (state, action) => {
      state.deleteAdd.AddDelete = action.payload;
      state.deleteAdd.AddDelLoading = false;
    });
    builder.addCase(deleteDigiAddress.rejected, (state, action) => {
      state.deleteAdd.AddDelLoading = false;
    });
  },
});
export const { addItem, removeItem, deleteItem, removePinData } =
  DeliverySlice.actions;
export default DeliverySlice.reducer;
