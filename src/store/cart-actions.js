import { uiActions } from "./ui";
import { cartActions } from "./cart";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://dummymovie-96eb2-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw Error("Could not fetch cart data");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartItems = await fetchData();
      dispatch(cartActions.replaceCart(cartItems));
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart data updated",
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
