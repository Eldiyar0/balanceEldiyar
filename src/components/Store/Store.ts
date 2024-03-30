import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/product";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: never) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    product: productReducer,
  },
  preloadedState: preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
