import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  updateUserThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
  getUserThunk,
  clearUserError,
  getUserStateSelector,
  getUserSelector,
  isAuthorizedSelector,
  getUserErrorSelector,
  userInitialState
} from './userSlice';
import { user } from '../../../../cypress/fixtures/user.json';

const accessToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Mzk3ZDY1YjI3YjA2MDAxYzNlOGE0OCIsImlhdCI6MTczODAzNzEyNCwiZXhwIjoxNzM4MDM4MzI0fQ.Kwnk_t6T8AakgOpAm-OGVmUgtA1NUH0jSPxFbRXnhPs';
const refreshToken =
  '4dc1321e3d171637d48b1ddcf4943c8a6486fbb412e5cf940c606e2326e37b95349df81c4772fc2f';

const setupStore = () =>
  configureStore({
    reducer: {
      user: userReducer
    }
  });

describe('User Slice', () => {
  describe('Reducers', () => {
    test('[TEST] clearUserError Clear the Error', () => {
      const store = setupStore();
      const initialStateWithError = {
        ...userInitialState,
        error: 'Some error'
      };
      store.dispatch({ type: 'user/setState', payload: initialStateWithError });
      store.dispatch(clearUserError());
      const state = store.getState();
      expect(state.user.error).toBeNull();
    });
  });

  describe('Selectors', () => {
    test('[TEST] getUserStateSelector Return the Entire User State', () => {
      const store = setupStore();
      const state = store.getState();
      expect(getUserStateSelector(state)).toEqual(state.user);
    });

    test('[TEST] getUserSelector Return the User', () => {
      const store = setupStore();
      const state = store.getState();
      expect(getUserSelector(state)).toEqual(state.user.user);
    });

    test('[TEST] isAuthorizedSelector Return the isAuthorized Flag', () => {
      const store = setupStore();
      const state = store.getState();
      expect(isAuthorizedSelector(state)).toEqual(state.user.isAuthorized);
    });

    test('[TEST] getUserErrorSelector Return the Error', () => {
      const store = setupStore();
      const state = store.getState();
      expect(getUserErrorSelector(state)).toEqual(state.user.error);
    });
  });

  describe('Thunks', () => {
    describe('loginUserThunk', () => {
      test('[TEST] Handle Pending State', () => {
        const store = setupStore();
        store.dispatch({ type: loginUserThunk.pending.type });
        const state = store.getState();
        expect(state.user.isLoading).toBeTruthy();
        expect(state.user.error).toBeNull();
      });

      test('[TEST] Handle Rejected State', () => {
        const store = setupStore();
        const error = 'mocked error';
        store.dispatch({
          type: loginUserThunk.rejected.type,
          error: { message: error }
        });
        const state = store.getState();
        expect(state.user.isLoading).toBeFalsy();
        expect(state.user.error).toBe(error);
      });

      test('[TEST] Handle Fulfilled State', () => {
        const mockedPayload = {
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: user
        };
        const store = setupStore();
        store.dispatch({
          type: loginUserThunk.fulfilled.type,
          payload: mockedPayload
        });
        const state = store.getState();
        expect(state.user.isLoading).toBeFalsy();
        expect(state.user.error).toBeNull();
        expect(state.user.user).toEqual(mockedPayload.user);
        expect(state.user.isAuthorized).toBeTruthy();
      });
    });

    describe('registerUserThunk', () => {
      test('[TEST] Handle Pending State', () => {
        const store = setupStore();
        store.dispatch({ type: registerUserThunk.pending.type });
        const state = store.getState();
        expect(state.user.isLoading).toBeTruthy();
        expect(state.user.error).toBeNull();
      });

      test('[TEST] Handle Rejected State', () => {
        const store = setupStore();
        const error = 'mocked error';
        store.dispatch({
          type: registerUserThunk.rejected.type,
          error: { message: error }
        });
        const state = store.getState();
        expect(state.user.isLoading).toBeFalsy();
        expect(state.user.error).toBe(error);
      });

      test('[TEST] Handle Fulfilled State', () => {
        const mockedPayload = {
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: user
        };
        const store = setupStore();
        store.dispatch({
          type: registerUserThunk.fulfilled.type,
          payload: mockedPayload
        });
        const state = store.getState();
        expect(state.user.isLoading).toBeFalsy();
        expect(state.user.error).toBeNull();
        expect(state.user.user).toEqual(mockedPayload.user);
        expect(state.user.isAuthorized).toBeTruthy();
      });
    });

    describe('logoutUserThunk', () => {
      test('[TEST] Handle Pending State', () => {
        const store = setupStore();
        store.dispatch({ type: logoutUserThunk.pending.type });
        const state = store.getState();
        expect(state.user.isLoading).toBeTruthy();
        expect(state.user.error).toBeNull();
      });

      test('[TEST] Handle Rejected State', () => {
        const store = setupStore();
        const error = 'mocked error';
        store.dispatch({
          type: logoutUserThunk.rejected.type,
          error: { message: error }
        });
        const state = store.getState();
        expect(state.user.isLoading).toBeFalsy();
        expect(state.user.error).toBe(error);
      });

      test('[TEST] Handle Fulfilled State', () => {
        const mockedPayload = {
          message: 'Successful logout'
        };
        const store = setupStore();
        store.dispatch({
          type: logoutUserThunk.fulfilled.type,
          payload: mockedPayload
        });
        const state = store.getState();
        expect(state.user.isLoading).toBeFalsy();
        expect(state.user.error).toBeNull();
        expect(state.user.user).toBeNull();
        expect(state.user.isAuthorized).toBeFalsy();
      });
    });

    describe('updateUserThunk', () => {
      test('[TEST] Handle Pending State', () => {
        const store = setupStore();
        store.dispatch({ type: updateUserThunk.pending.type });
        const state = store.getState();
        expect(state.user.isLoading).toBeTruthy();
        expect(state.user.error).toBeNull();
      });

      test('[TEST] Handle Rejected State', () => {
        const store = setupStore();
        const error = 'mocked error';
        store.dispatch({
          type: updateUserThunk.rejected.type,
          error: { message: error }
        });
        const state = store.getState();
        expect(state.user.isLoading).toBeFalsy();
        expect(state.user.error).toBe(error);
      });

      test('[TEST] Handle Fulfilled State', () => {
        const mockedPayload = {
          user: user
        };
        const store = setupStore();
        store.dispatch({
          type: updateUserThunk.fulfilled.type,
          payload: mockedPayload
        });
        const state = store.getState();
        expect(state.user.isLoading).toBeFalsy();
        expect(state.user.error).toBeNull();
        expect(state.user.user).toEqual(mockedPayload.user);
        expect(state.user.isAuthorized).toBeTruthy();
      });
    });

    describe('forgotPasswordThunk', () => {
      test('[TEST] Handle Pending State', () => {
        const store = setupStore();
        store.dispatch({ type: forgotPasswordThunk.pending.type });
        const state = store.getState();
        expect(state.user.isLoading).toBeTruthy();
        expect(state.user.error).toBeNull();
      });

      test('[TEST] Handle Rejected State', () => {
        const store = setupStore();
        const error = 'mocked error';
        store.dispatch({
          type: forgotPasswordThunk.rejected.type,
          error: { message: error }
        });
        const state = store.getState();
        expect(state.user.isLoading).toBeFalsy();
        expect(state.user.error).toBe(error);
      });

      test('[TEST] Handle Fulfilled State', () => {
        const mockedPayload = {
          message: 'Reset email sent'
        };
        const store = setupStore();
        store.dispatch({
          type: forgotPasswordThunk.fulfilled.type,
          payload: mockedPayload
        });
        const state = store.getState();
        expect(state.user.isLoading).toBeFalsy();
        expect(state.user.error).toBeNull();
        expect(state.user.user).toBeNull();
        expect(state.user.isAuthorized).toBeFalsy();
      });
    });

    describe('resetPasswordThunk', () => {
      test('[TEST] Handle Pending State', () => {
        const store = setupStore();
        store.dispatch({ type: resetPasswordThunk.pending.type });
        const state = store.getState();
        expect(state.user.isLoading).toBeTruthy();
        expect(state.user.error).toBeNull();
      });

      test('[TEST] Handle Rejected State', () => {
        const store = setupStore();
        const error = 'mocked error';
        store.dispatch({
          type: resetPasswordThunk.rejected.type,
          error: { message: error }
        });
        const state = store.getState();
        expect(state.user.isLoading).toBeFalsy();
        expect(state.user.error).toBe(error);
      });

      test('[TEST] Handle Fulfilled State', () => {
        const mockedPayload = {
          message: 'Password successfully reset'
        };
        const store = setupStore();
        store.dispatch({
          type: resetPasswordThunk.fulfilled.type,
          payload: mockedPayload
        });
        const state = store.getState();
        expect(state.user.isLoading).toBeFalsy();
        expect(state.user.error).toBeNull();
        expect(state.user.user).toBeNull();
        expect(state.user.isAuthorized).toBeFalsy();
      });
    });

    describe('getUserThunk', () => {
      test('[TEST] Handle Pending State', () => {
        const store = setupStore();
        store.dispatch({ type: getUserThunk.pending.type });
        const state = store.getState();
        expect(state.user.isLoading).toBeTruthy();
        expect(state.user.error).toBeNull();
      });

      test('[TEST] Handle Rejected State', () => {
        const store = setupStore();
        const error = 'mocked error';
        store.dispatch({
          type: getUserThunk.rejected.type,
          error: { message: error }
        });
        const state = store.getState();
        expect(state.user.isLoading).toBeFalsy();
        expect(state.user.error).toBe(error);
      });

      test('[TEST] Handle Fulfilled State', () => {
        const mockedPayload = {
          user: user
        };
        const store = setupStore();
        store.dispatch({
          type: getUserThunk.fulfilled.type,
          payload: mockedPayload
        });
        const state = store.getState();
        expect(state.user.isLoading).toBeFalsy();
        expect(state.user.error).toBeNull();
        expect(state.user.user).toEqual(mockedPayload.user);
        expect(state.user.isAuthorized).toBeTruthy();
      });
    });
  });
});
