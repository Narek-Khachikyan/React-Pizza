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
         const newItem = {
            ...action.payload,
            count: 1,
         };

         const existingItemIndex = state.items.findIndex(
            (item) =>
               item.id === newItem.id && item.type === newItem.type && item.size === newItem.size,
         );

         if (existingItemIndex !== -1) {
            state.items[existingItemIndex].count++;
         } else {
            state.items.push(newItem);
         }

         state.totalPrice = calculateTotalPrice(state.items);
      },
      minusItem(state, action: PayloadAction<CartItemType>) {
         const existingItemIndex = state.items.findIndex(
            (item) =>
               item.id === action.payload.id &&
               item.type === action.payload.type &&
               item.size === action.payload.size,
         );

         if (existingItemIndex !== -1) {
            if (state.items[existingItemIndex].count > 1) {
               state.items[existingItemIndex].count--;
            } else {
               state.items.splice(existingItemIndex, 1);
            }
         }

         state.totalPrice = calculateTotalPrice(state.items);
      },

      removeItems(state, action: PayloadAction<number>) {
         state.items = state.items.filter((item) => item.id !== action.payload);
         state.totalPrice = calculateTotalPrice(state.items);
      },
      clearItems(state) {
         state.items = [];
         state.totalPrice = 0;
      },
   },
});

const calculateTotalPrice = (items: CartItemType[]) => {
   return items.reduce((sum, item) => {
      return item.price * item.count + sum;
   }, 0);
};

export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
export const { addItem, removeItems, clearItems, minusItem } = cartSlice.actions;
