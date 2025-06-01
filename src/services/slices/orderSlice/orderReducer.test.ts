import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import orderReducer, {
  getOrderThunk,
  getOrderSelector,
  orderInitialState
} from './orderSlice';
import { getOrderByNumberApi } from '../../../utils/burger-api';

jest.mock('../../../utils/burger-api');

const mockedGetOrderByNumberApi = getOrderByNumberApi as jest.MockedFunction<
  typeof getOrderByNumberApi
>;

const setupStore = () =>
  configureStore({
    reducer: {
      order: orderReducer
    }
  });

describe('Order Slice', () => {
  describe('getOrderThunk', () => {
    test('[TEST] Handle Initial State', () => {
      const store = setupStore();
      const state = store.getState().order;
      expect(state).toEqual(orderInitialState);
    });

    test('[TEST] Handle Pending State', () => {
      const store = setupStore();
      store.dispatch({ type: getOrderThunk.pending.type });
      const state = store.getState().order;
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('[TEST] Handle Rejected State', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getOrderThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState().order;
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBe(error);
    });

    test('[TEST] Handle Fulfilled State', () => {
      const mockedPayload = {
        orders: [
          {
            _id: '67981883133acd001be4d17d',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093f',
              '643d69a5c3f7b9001cfa0946',
              '643d69a5c3f7b9001cfa094a',
              '643d69a5c3f7b9001cfa0940',
              '643d69a5c3f7b9001cfa0949',
              '643d69a5c3f7b9001cfa094a',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa093d'
            ],
            owner: {
              name: 'Andrei',
              email: 'andrei@gmail.com',
              createdAt: '2024-11-17T05:21:41.443Z',
              updatedAt: '2024-11-17T05:21:41.443Z'
            },
            status: 'done',
            name: 'Флюоресцентный space астероидный бессмертный минеральный экзо-плантаго метеоритный бургер',
            createdAt: '2025-01-27T23:36:35.716Z',
            updatedAt: '2025-01-27T23:36:36.384Z',
            number: 67010
          }
        ]
      };
      const store = setupStore();
      store.dispatch({
        type: getOrderThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState().order;
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.order).toEqual(mockedPayload.orders[0]);
    });
  });

  describe('Selectors', () => {
    test('[TEST] getOrderSelector Return Order State', () => {
      const store = setupStore();
      const state = store.getState();
      expect(getOrderSelector(state)).toEqual(state.order);
    });
  });

  describe('Actions', () => {
    test('[TEST] getOrderThunk Dispatch Fulfilled Action on Successful API Call', async () => {
      const mockedPayload = {
        success: true,
        orders: [
          {
            _id: '67981883133acd001be4d17d',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093f',
              '643d69a5c3f7b9001cfa0946',
              '643d69a5c3f7b9001cfa094a',
              '643d69a5c3f7b9001cfa0940',
              '643d69a5c3f7b9001cfa0949',
              '643d69a5c3f7b9001cfa094a',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa093d'
            ],
            owner: {
              name: 'Andrei',
              email: 'andrei@gmail.com',
              createdAt: '2024-11-17T05:21:41.443Z',
              updatedAt: '2024-11-17T05:21:41.443Z'
            },
            status: 'done',
            name: 'Флюоресцентный space астероидный бессмертный минеральный экзо-плантаго метеоритный бургер',
            createdAt: '2025-01-27T23:36:35.716Z',
            updatedAt: '2025-01-27T23:36:36.384Z',
            number: 67010
          }
        ]
      };
      mockedGetOrderByNumberApi.mockResolvedValueOnce(mockedPayload);

      const store = setupStore();
      await store.dispatch(getOrderThunk(67010));
      const state = store.getState().order;
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.order).toEqual(mockedPayload.orders[0]);
    });

    test('[TEST] getOrderThunk Dispatch Rejected Action on Failed API Call', async () => {
      const errorMessage = 'mocked error';
      mockedGetOrderByNumberApi.mockRejectedValueOnce(new Error(errorMessage));

      const store = setupStore();
      await store.dispatch(getOrderThunk(67010));
      const state = store.getState().order;
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBe(errorMessage);
    });
  });
});
