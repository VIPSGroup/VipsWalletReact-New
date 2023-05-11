import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { appType, currAppVersion, digiBaseUrl } from "../../../../constants";

export const getMetalProductlist = createAsyncThunk(
  "getMetalProductlist",
  async ({ page }, thunkAPI) => {
    const formData = new FormData();
    formData.append("page", page);
    formData.append("count", 10);
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
export const deliveryPlaceOrder = createAsyncThunk(
  "deliveryPlaceOrder",
  async ({ Data }, thunkAPI) => {
    const {
      Username,
      Password,
      Useraddressid,
      address,
      shippingCharges,
      items,
      otp,
    } = Data;
    const formData = new URLSearchParams();
    formData.append("Username", Username);
    formData.append("Password", Password);
    formData.append("otp", otp ? otp : "");
    formData.append("AppType", appType);
    formData.append("currentAppVersion", currAppVersion);
    formData.append("Useraddressid", Useraddressid);
    formData.append("addressId", Useraddressid);
    formData.append("address", address);
    formData.append("shippingCharges", shippingCharges);
    items.forEach((item, index) => {
      formData.append(`product[${index}][sku]`, item.sku);
      formData.append(`product[${index}][quantity]`, item.quantity);
    });
    try {
      const res = await axios.post(`${digiBaseUrl}order`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getDeliveryOrderDetails = createAsyncThunk(
  "getDeliveryOrderDetails",
  async ({ Username, Password, merchantOrderId }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("Username", Username);
      formData.append("Password", Password);
      formData.append("merchantOrderId", merchantOrderId);
      const res = await axios.post(`${digiBaseUrl}Orderinfo`, formData);
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
    placeOrder: {
      placeLoader: false,
      response: "",
    },
    getOrderDetails: {
      orderDetails: "",
      orderDetailLoad: false,
    },
  },

  reducers: {
    addItem: (state, action) => {
      const { sku } = action.payload;
      const existingItem = state.items.find((item) => item.sku === sku);
      if (existingItem) {
        // If item already exists in the cart, increment the quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add the item to the cart with initial quantity of 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
      // Update localStorage with the updated cart state
      localStorage.setItem("digiCart", JSON.stringify(state.items));
      // },
    },
    increaseQuantity: (state, action) => {
      const { sku } = action.payload;
      const existingItem = state.items.find((item) => item.sku === sku);
      if (existingItem) {
        // Increase the quantity of the item in the cart
        existingItem.quantity += 1;
      }
      // Update localStorage with the updated cart state
      localStorage.setItem("digiCart", JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action) => {
      const { sku } = action.payload;
      const existingItem = state.items.find((item) => item.sku === sku);
      if (existingItem) {
        // Decrease the quantity of the item in the cart
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        }
      }
      // Update localStorage with the updated cart state
      localStorage.setItem("digiCart", JSON.stringify(state.items));
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
    clearCart: (state, action) => {
      const clear = [];
      state.items = clear;
      localStorage.setItem("digiCart", JSON.stringify(clear));
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

    builder.addCase(deliveryPlaceOrder.pending, (state, action) => {
      state.placeOrder.placeLoader = true;
    });
    builder.addCase(deliveryPlaceOrder.fulfilled, (state, action) => {
      state.placeOrder.response = action.payload;
      state.placeOrder.placeLoader = false;
    });
    builder.addCase(deliveryPlaceOrder.rejected, (state, action) => {
      state.placeOrder.placeLoader = false;
    });
    builder.addCase(getDeliveryOrderDetails.pending, (state, action) => {
      state.getOrderDetails.orderDetailLoad = true;
    });
    builder.addCase(getDeliveryOrderDetails.fulfilled, (state, action) => {
      state.getOrderDetails.orderDetails = action.payload;
      state.getOrderDetails.orderDetailLoad = false;
    });
    builder.addCase(getDeliveryOrderDetails.rejected, (state, action) => {
      state.getOrderDetails.orderDetailLoad = false;
    });
  },
});
export const {
  addItem,
  removeItem,
  deleteItem,
  removePinData,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = DeliverySlice.actions;
export default DeliverySlice.reducer;
