import { createSlice } from "@reduxjs/toolkit";

const DeliverySlice = createSlice({
  name: "DeliverySlice",
  initialState: {
    items: JSON.parse(localStorage.getItem("digiCart")) || [],
    totalAmount: 0,
  },

  reducers: {
    addItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.Id === action.payload.Id
      );
      if (index === -1) {
        state.items.push({ ...action.payload, quantity: 1 });
      } else {
        state.items[index].quantity += 1;
      }
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.Id === action.payload.Id
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
        (product) => product.Id !== action.payload.Id
      );
      localStorage.setItem("digiCart", JSON.stringify(updatedProducts));
      state.items = updatedProducts;
    },
  },
});
export const { addItem, removeItem, deleteItem } = DeliverySlice.actions;
export default DeliverySlice.reducer;
