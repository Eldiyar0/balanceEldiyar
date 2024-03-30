// Ваш файл productSlice.ts
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
  balance: 200000000,
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products = [...state.products, action.payload];
      state.balance -= action.payload.amount;
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((el) => el.id !== action.payload);
    },
  },
});

export const { addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
