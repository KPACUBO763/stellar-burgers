import { CONSTRUCTOR_SLICE_NAME } from '../sliceNames';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';
import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk
} from '@reduxjs/toolkit';

interface IConstructorState {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null | undefined;
}

const initialState: IConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const orderBurger = createAsyncThunk('orderBurger', orderBurgerApi);

export const constructorSlice = createSlice({
  name: CONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    resetModalData: (state) => {
      state.orderModalData = null;
    },
    moveDownIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const currentIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (currentIndex < state.constructorItems.ingredients.length - 1) {
        state.constructorItems.ingredients[currentIndex] =
          state.constructorItems.ingredients[currentIndex + 1];
        state.constructorItems.ingredients[currentIndex + 1] = action.payload;
      }
    },
    moveUpIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const currentIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (currentIndex > 0) {
        state.constructorItems.ingredients[currentIndex] =
          state.constructorItems.ingredients[currentIndex - 1];
        state.constructorItems.ingredients[currentIndex - 1] = action.payload;
      }
    }
  },
  selectors: {
    getConstructorSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      // Order burger
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
        state.error = null;
      });
  }
});

export const { getConstructorSelector } = constructorSlice.selectors;

export const {
  addIngredient,
  removeIngredient,
  moveDownIngredient,
  moveUpIngredient,
  resetModalData
} = constructorSlice.actions;
