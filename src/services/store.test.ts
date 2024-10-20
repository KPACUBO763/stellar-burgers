import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';

describe('rootReducer', () => {
  test('checking right initialState rootReducer', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(store.getState());
  });
});
