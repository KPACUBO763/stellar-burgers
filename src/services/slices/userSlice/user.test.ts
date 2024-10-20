import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
  registerUser,
  loginUser,
  getUser,
  logout
} from './userSlice';

// Константы для данных
const EMAIL = 'test@test.com';
const NAME = 'user';
const PASSWORD = 'password';

const userData = {
  email: EMAIL,
  name: NAME
};
// Мокаем API и cookie
jest.mock('../../../utils/cookie');
jest.mock('@api', () => ({
  registerUserApi: jest.fn(() =>
    Promise.resolve({
      user: {
        email: EMAIL,
        name: NAME,
        password: PASSWORD
      }
    })
  ),
  loginUserApi: jest.fn(() =>
    Promise.resolve({
      user: userData,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    })
  ),
  getUserApi: jest.fn(() =>
    Promise.resolve({
      user: userData
    })
  ),
  logoutApi: jest.fn(() =>
    Promise.resolve({
      user: null,
      accessToken: '',
      refreshToken: ''
    })
  )
}));

// Мокаем localStorage
global.localStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(() => null),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn((index: number) => null)
};

describe('checking userReducer', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // очищаем моки перед каждым тестом
  });

  test('loginUser thunk', async () => {
    const store = configureStore({
      reducer: { user: userReducer }
    });

    await store.dispatch(
      loginUser({
        email: EMAIL,
        password: PASSWORD
      })
    );

    const state = store.getState().user;

    expect(state.user).toEqual(userData);
    expect(state.isAuthorized).toBeTruthy();
    expect(state.error).toBeNull();
  });

  test('getUser thunk', async () => {
    const store = configureStore({
      reducer: { user: userReducer }
    });

    await store.dispatch(getUser());

    const state = store.getState().user;

    expect(state.user).toEqual(userData);
    expect(state.isAuthorized).toBeTruthy();
    expect(state.error).toBeNull();
  });

  test('registerUser thunk', async () => {
    const store = configureStore({
      reducer: { user: userReducer }
    });

    await store.dispatch(
      registerUser({
        email: EMAIL,
        name: NAME,
        password: PASSWORD
      })
    );

    const state = store.getState().user;

    expect(state.error).toBeNull();
  });

  test('logout thunk', async () => {
    const store = configureStore({
      reducer: { user: userReducer }
    });

    await store.dispatch(logout());

    const state = store.getState().user;

    expect(state.user).toBeNull();
    expect(state.isAuthorized).toBeFalsy();
  });
});
