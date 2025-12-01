import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice';
import constructorReducer from '../slices/constructorSlice';
import orderReducer from '../slices/orderSlice';
import feedReducer from '../slices/feedSlice';
import profileOrdersReducer from '../slices/profileOrdersSlice';
import userReducer from '../slices/userSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
  user: userReducer
});

describe('rootReducer', () => {
  it('должен возвращать корректное начальное состояние при вызове с undefined состоянием', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, action);

    expect(state).toBeDefined();
    expect(state.ingredients).toBeDefined();
    expect(state.burgerConstructor).toBeDefined();
    expect(state.order).toBeDefined();
    expect(state.feed).toBeDefined();
    expect(state.profileOrders).toBeDefined();
    expect(state.user).toBeDefined();
  });

  it('должен возвращать корректное начальное состояние при обработке неизвестного экшена', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('должен иметь корректную структуру начального состояния', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state.ingredients).toEqual({
      items: [],
      isLoading: false,
      error: null
    });

    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    expect(state.order).toEqual({
      order: null,
      orderModalData: null,
      isLoading: false,
      error: null
    });
  });
});

