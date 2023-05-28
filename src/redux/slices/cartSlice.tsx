import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItemType = {
   id: number;
   title: string;
   price: number;
   imageUrl: string;
   type: number;
   size: number;
   count: number;
};

type CartSliceState = {
   totalPrice: number;
   items: CartItemType[];
};

export const initialState: CartSliceState = {
   totalPrice: 0,
   items: [],
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem(state, action: PayloadAction<CartItemType>) {
         const findItem = state.items.find((obj) => obj.id === action.payload.id);
         if (findItem) {
            findItem.count++;
         } else {
            state.items.push({
               ...action.payload,
               count: 1,
            });
         }
         state.totalPrice = state.items.reduce((sum, obj) => {
            return obj.price * obj.count + sum;
         }, 0);
      },
      minusItem(state, action: PayloadAction<CartItemType>) {
         const findItem = state.items.find((obj) => obj.id === action.payload.id);
         if (findItem) {
            if (findItem.count >= 1) {
               findItem.count--;
            } else {
               state.items = state.items.filter((obj) => obj.id !== action.payload.id);
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
               return obj.price * obj.count + sum;
            }, 0);
         } else {
            // Item not found
         }
      },

      removeItems(state, action: PayloadAction<number>) {
         state.items = state.items.filter((obj) => obj.id !== action.payload);
      },
      clearItems(state) {
         state.items = [];
      },
   },
});

export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
export const { addItem, removeItems, clearItems, minusItem } = cartSlice.actions;
