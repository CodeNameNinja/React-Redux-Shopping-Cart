import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart: (state, action) => {
      state.changed = true;
      const { id, price } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity++;
        item.totalPrice = item.totalPrice + price;
      } else {
        state.items.push({ ...action.payload, totalPrice: price, quantity: 1 });
      }
      state.totalQuantity++;
    },
    removeItemFromCart: (state, action) => {
      state.changed = true;
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          item.quantity--;
          item.totalPrice = item.totalPrice - item.price;
        }
      }
      state.totalQuantity--;
    },
  },
});


export const cartActions = cartSlice.actions;
export default cartSlice;
