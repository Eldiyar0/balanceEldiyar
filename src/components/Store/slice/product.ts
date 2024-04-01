import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  type: string;
  amount: number;
  category: string;
  description: string;
  data: string;
}

interface InitialState {
  products: Product[];
  balance: number;
}

const initialState: InitialState = {
  products: [],
  balance: 2000000000,
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products = [...state.products, action.payload];
      if (action.payload.type === "Cash in") {
        state.balance += action.payload.amount;
      } else if (action.payload.type === "Cash out") {
        state.balance -= action.payload.amount;
      } else {
        state.balance = state.balance;
      }
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((el) => el.id !== action.payload);
    },
    sortProducts: (state, action) => {
      const { type } = action.payload;
      switch (type) {
        case "min":
          state.products.sort((a, b) => a.amount - b.amount);
          break;
        case "max":
          state.products.sort((a, b) => b.amount - a.amount);
          break;
        case "category":
          state.products.sort((a, b) => a.category.localeCompare(b.category));
          break;
        case "new":
          state.products.sort((a, b) => a.data.localeCompare(b.data));
          break;
        case "lower":
          state.products.reverse();
          break;
        default:
          break;
      }
    },
  },
});

export const { addProduct, deleteProduct, sortProducts } = productSlice.actions;
export default productSlice.reducer;
