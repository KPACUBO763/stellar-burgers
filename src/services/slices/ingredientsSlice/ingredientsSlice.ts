import { INGREDIENTS_SLICE_NAME } from '../sliceNames';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

interface IIngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean | null;
  error: string | undefined | null;
}

export const getIngredients = createAsyncThunk(
  'ingredients',
  getIngredientsApi
);

const initialState: IIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIsLoadingIngredientsSelector: (state) => state.isLoading
  }
});

export { initialState as ingredientsInitialState };

export const { getIngredientsSelector, getIsLoadingIngredientsSelector } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
