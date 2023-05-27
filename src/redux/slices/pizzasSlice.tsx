import axios from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type PizzaType = {
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  id: number;
};

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

type InitialStateType = {
  items: PizzaType[];
  status: Status;
};

export const initialState: InitialStateType = {
  items: [],
  status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk<
  PizzaType[],
  Record<string, string>
>("pizzas/fetchPizzasStatus", async (params) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get<PizzaType[]>(
    `https://645f2f137da4477ba9528391.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
  );
  return data as PizzaType[];
});

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaType[]>) {
      state.items = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export default pizzasSlice.reducer;
export const { setItems } = pizzasSlice.actions;
