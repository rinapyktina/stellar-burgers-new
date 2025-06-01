import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer, {
  getIngredientsThunk,
  getIngredientsStateSelector,
  getIngredientsSelector,
  ingredientsInitialState
} from './ingredientsSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      ingredients: ingredientsReducer
    }
  });

describe('Ingredients Slice', () => {
  describe('getIngredientsThunk', () => {
    test('[TEST] Handle Pending State', () => {
      const store = setupStore();
      store.dispatch({ type: getIngredientsThunk.pending.type });
      const state = store.getState();
      expect(state.ingredients.isLoading).toBeTruthy();
      expect(state.ingredients.error).toBeNull();
    });

    test('[TEST] Handle Rejected State', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getIngredientsThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.ingredients.isLoading).toBeFalsy();
      expect(state.ingredients.error).toBe(error);
    });

    test('[TEST] Handle Fulfilled State', () => {
      const mockedPayload = [
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        }
      ];
      const store = setupStore();
      store.dispatch({
        type: getIngredientsThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.ingredients.isLoading).toBeFalsy();
      expect(state.ingredients.error).toBeNull();
      expect(state.ingredients.ingredients).toEqual(mockedPayload);
    });
  });

  describe('Selectors', () => {
    test('[TEST] getIngredientsStateSelector Return Entire Ingredients Slice', () => {
      const store = setupStore();
      const state = store.getState();
      const selectedState = getIngredientsStateSelector(state);
      expect(selectedState).toEqual(ingredientsInitialState);
    });

    test('[TEST] getIngredientsSelector Return Ingredients Array', () => {
      const store = setupStore();
      const state = store.getState();
      const selectedIngredients = getIngredientsSelector(state);
      expect(selectedIngredients).toEqual(ingredientsInitialState.ingredients);
    });
  });

  describe('Initial State', () => {
    test('[TEST] Return the Initial State', () => {
      const store = setupStore();
      const state = store.getState();
      expect(state.ingredients).toEqual(ingredientsInitialState);
    });
  });
});
