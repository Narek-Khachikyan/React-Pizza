import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SortType = {
  name: string;
  sortProperty: "rating" | "-rating" | "price" | "-price" | "title" | "-title";
};
type sortPropertyType = {
  sortProperty: "rating" | "-rating" | "price" | "-price" | "title" | "-title";
};

type FilterInitialStateType = {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortType;
};

export const initialState: FilterInitialStateType = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "popularity(DESC)",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(
      state,
      action: PayloadAction<FilterInitialStateType & sortPropertyType>
    ) {
      state.sort.sortProperty = action.payload.sortProperty;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export default filterSlice.reducer;
export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;
