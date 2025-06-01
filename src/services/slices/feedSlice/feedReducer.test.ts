import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import feedReducer, {
  getFeedThunk,
  getOrdersThunk,
  getFeedStateSelector,
  getOrdersSelector,
  feedInitialState
} from './feedSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      feed: feedReducer
    }
  });

describe('Feed Slice', () => {
  describe('Initial State', () => {
    test('[TEST] Return the Initial State', () => {
      const store = setupStore();
      const state = store.getState().feed;
      expect(state).toEqual(feedInitialState);
    });
  });

  describe('Selectors', () => {
    test('[TEST] getFeedStateSelector Return the Entire Feed State', () => {
      const store = setupStore();
      const rootState = store.getState();
      expect(getFeedStateSelector(rootState)).toEqual(rootState.feed);
    });

    test('getOrdersSelector Return the Orders From the Feed State', () => {
      const store = setupStore();
      const rootState = store.getState();
      expect(getOrdersSelector(rootState)).toEqual(rootState.feed.orders);
    });
  });

  describe('Thunks', () => {
    describe('getFeedThunk', () => {
      test('[TEST] Handle Pending State', () => {
        const store = setupStore();
        store.dispatch({ type: getFeedThunk.pending.type });
        const state = store.getState().feed;
        expect(state.isLoading).toBeTruthy();
        expect(state.error).toBeNull();
      });

      test('[TEST] Handle Rejected State', () => {
        const store = setupStore();
        const error = 'mocked error';
        store.dispatch({
          type: getFeedThunk.rejected.type,
          error: { message: error }
        });
        const state = store.getState().feed;
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
              status: 'done',
              name: 'Флюоресцентный space астероидный бессмертный минеральный экзо-плантаго метеоритный бургер',
              createdAt: '2025-01-27T23:36:35.716Z',
              updatedAt: '2025-01-27T23:36:36.384Z',
              number: 67010
            }
          ],
          total: 67015,
          totalToday: 40
        };
        const store = setupStore();
        store.dispatch({
          type: getFeedThunk.fulfilled.type,
          payload: mockedPayload
        });
        const state = store.getState().feed;
        expect(state.isLoading).toBeFalsy();
        expect(state.error).toBeNull();
        expect(state.orders).toEqual(mockedPayload.orders);
        expect(state.total).toBe(mockedPayload.total);
        expect(state.totalToday).toBe(mockedPayload.totalToday);
      });
    });

    describe('getOrdersThunk', () => {
      test('[TEST] Handle Pending State', () => {
        const store = setupStore();
        store.dispatch({ type: getOrdersThunk.pending.type });
        const state = store.getState().feed;
        expect(state.isLoading).toBeTruthy();
        expect(state.error).toBeNull();
      });

      test('[TEST] Handle Rejected State', () => {
        const store = setupStore();
        const error = 'mocked error';
        store.dispatch({
          type: getOrdersThunk.rejected.type,
          error: { message: error }
        });
        const state = store.getState().feed;
        expect(state.isLoading).toBeFalsy();
        expect(state.error).toBe(error);
      });

      test('[TEST] Handle Fulfilled State', () => {
        const mockedPayload = [
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
            status: 'done',
            name: 'Флюоресцентный space астероидный бессмертный минеральный экзо-плантаго метеоритный бургер',
            createdAt: '2025-01-27T23:36:35.716Z',
            updatedAt: '2025-01-27T23:36:36.384Z',
            number: 67010
          }
        ];
        const store = setupStore();
        store.dispatch({
          type: getOrdersThunk.fulfilled.type,
          payload: mockedPayload
        });
        const state = store.getState().feed;
        expect(state.isLoading).toBeFalsy();
        expect(state.error).toBeNull();
        expect(state.orders).toEqual(mockedPayload);
      });
    });
  });
});
