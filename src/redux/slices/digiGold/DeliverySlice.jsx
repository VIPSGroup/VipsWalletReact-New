import { createSlice } from "@reduxjs/toolkit";

const DeliverySlice = createSlice({
  name: "DeliverySlice",
  initialState: {
    // cart: {
    //   data: JSON.parse(localStorage.getItem("digiCart")),
    // },
    items: JSON.parse(localStorage.getItem("digiCart")) || [],
    totalAmount: 0,
  },
  // reducers: {
  //   addDigiCart: (state, action) => {
  //     let item = action.payload;
  //     const prevCart = JSON.parse(localStorage.getItem("digiCart"));
  //     let cartToBe = [];
  //     if (prevCart) {
  //       cartToBe = [...prevCart];
  //       if (cartToBe.find((a) => a.data.Id === item.data.Id)) {
  //         cartToBe = cartToBe.filter((c) => c.data.Id !== item.data.Id);
  //         const data = action.payload;
  //         cartToBe.push(data);
  //       } else if (cartToBe.find((a) => a.data.Id !== item.data.Id)) {
  //         const data = action.payload;
  //         cartToBe.push(data);
  //       }
  //     } else {
  //       cartToBe.push(item);
  //     }

  //     localStorage.setItem("digiCart", JSON.stringify(cartToBe));
  //     state.cart.data = cartToBe;
  //   },
  //   removeCart: (state, action) => {
  //     const items = JSON.parse(localStorage.getItem("digiCart"));
  //     const Removed = items.filter((a) => a.data.Id !== action.payload);
  //     localStorage.setItem("digiCart", JSON.stringify(Removed));
  //     state.cart.data = Removed;
  //   },

  // },

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
      console.log(action.payload, "products");
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
