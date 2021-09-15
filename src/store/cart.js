import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart: (state, action) => {
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

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://dummymovie-96eb2-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Something went wrong",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
