import { expect, test, describe } from '@jest/globals';
import { rootReducer } from './store';
import { userInitialState } from './slices/userSlice/userSlice';
import { orderInitialState } from './slices/orderSlice/orderSlice';
import { ingredientsInitialState } from './slices/ingredientsSlice/ingredientsSlice';
import { feedInitialState } from './slices/feedSlice/feedSlice';
import { constructorInitialState } from './slices/constructorSlice/constructorSlice';

const expectedInitialState = {
  user: { ...userInitialState },
  feed: { ...feedInitialState },
  order: { ...orderInitialState },
  ingredients: { ...ingredientsInitialState },
  constructorbg: { ...constructorInitialState }
};

describe('Root reducer state validation', () => {
  test('Returns initial state when called with undefined state and unknown action', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(expectedInitialState);
  });

  describe('Initial state of individual slices', () => {
    let state: typeof expectedInitialState;

    beforeAll(() => {
      state = rootReducer(undefined, { type: '@@INIT' });
    });

    test('User slice has correct initial state', () => {
      expect(state.user).toEqual(userInitialState);
    });

    test('Feed slice has correct initial state', () => {
      expect(state.feed).toEqual(feedInitialState);
    });

    test('Order slice has correct initial state', () => {
      expect(state.order).toEqual(orderInitialState);
    });

    test('Ingredients slice has correct initial state', () => {
      expect(state.ingredients).toEqual(ingredientsInitialState);
    });

    test('Constructor slice has correct initial state', () => {
      expect(state.constructorbg).toEqual(constructorInitialState);
    });
  });
});
