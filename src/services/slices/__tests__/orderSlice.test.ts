import orderReducer, {
  createOrder,
  fetchOrderByNumber,
  clearOrder,
  setOrderModalData,
  clearOrderModalData,
  initialState
} from '../orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Краторный бургер',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  number: 12345,
  ingredients: ['ingredient-1', 'ingredient-2']
};

const mockOrder2: TOrder = {
  _id: 'order-2',
  status: 'pending',
  name: 'Био-марсианский бургер',
  createdAt: '2024-01-02T00:00:00.000Z',
  updatedAt: '2024-01-02T00:00:00.000Z',
  number: 12346,
  ingredients: ['ingredient-3']
};

describe('orderSlice reducer', () => {
  describe('синхронные редьюсеры', () => {
    it('должен очистить заказ и orderModalData', () => {
      const stateWithOrder = {
        ...initialState,
        order: mockOrder,
        orderModalData: mockOrder
      };
      const action = clearOrder();
      const state = orderReducer(stateWithOrder, action);

      expect(state.order).toBeNull();
      expect(state.orderModalData).toBeNull();
    });

    it('должен установить orderModalData', () => {
      const action = setOrderModalData(mockOrder);
      const state = orderReducer(initialState, action);

      expect(state.orderModalData).toEqual(mockOrder);
      expect(state.order).toBeNull();
    });

    it('должен очистить orderModalData', () => {
      const stateWithModalData = {
        ...initialState,
        orderModalData: mockOrder
      };
      const action = clearOrderModalData();
      const state = orderReducer(stateWithModalData, action);

      expect(state.orderModalData).toBeNull();
    });
  });

  describe('createOrder', () => {
    it('должен установить isLoading в true при начале запроса', () => {
      const action = { type: createOrder.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен очистить ошибку при начале нового запроса', () => {
      const stateWithError = {
        ...initialState,
        error: 'Предыдущая ошибка'
      };
      const action = { type: createOrder.pending.type };
      const state = orderReducer(stateWithError, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен установить isLoading в false и сохранить заказ при успешном создании', () => {
      const pendingAction = { type: createOrder.pending.type };
      const state1 = orderReducer(initialState, pendingAction);

      const fulfilledAction = {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      };
      const state2 = orderReducer(state1, fulfilledAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.order).toEqual(mockOrder);
      expect(state2.orderModalData).toEqual(mockOrder);
      expect(state2.error).toBeNull();
    });

    it('должен установить isLoading в false и сохранить ошибку при неудачном создании', () => {
      const pendingAction = { type: createOrder.pending.type };
      const state1 = orderReducer(initialState, pendingAction);

      const rejectedAction = {
        type: createOrder.rejected.type,
        error: { message: 'Ошибка создания заказа' }
      };
      const state2 = orderReducer(state1, rejectedAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.error).toBe('Ошибка создания заказа');
      expect(state2.order).toBeNull();
    });

    it('должен использовать сообщение по умолчанию, если ошибка не содержит message', () => {
      const pendingAction = { type: createOrder.pending.type };
      const state1 = orderReducer(initialState, pendingAction);

      const rejectedAction = {
        type: createOrder.rejected.type,
        error: {}
      };
      const state2 = orderReducer(state1, rejectedAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.error).toBe('Ошибка создания заказа');
    });
  });

  describe('fetchOrderByNumber', () => {
    it('должен установить isLoading в true при начале запроса', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен очистить ошибку при начале нового запроса', () => {
      const stateWithError = {
        ...initialState,
        error: 'Предыдущая ошибка'
      };
      const action = { type: fetchOrderByNumber.pending.type };
      const state = orderReducer(stateWithError, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен установить isLoading в false и сохранить заказ в orderModalData при успешном запросе', () => {
      const pendingAction = { type: fetchOrderByNumber.pending.type };
      const state1 = orderReducer(initialState, pendingAction);

      const fulfilledAction = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const state2 = orderReducer(state1, fulfilledAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.orderModalData).toEqual(mockOrder);
      expect(state2.order).toBeNull();
      expect(state2.error).toBeNull();
    });

    it('должен установить isLoading в false и сохранить ошибку при неудачном запросе', () => {
      const pendingAction = { type: fetchOrderByNumber.pending.type };
      const state1 = orderReducer(initialState, pendingAction);

      const rejectedAction = {
        type: fetchOrderByNumber.rejected.type,
        error: { message: 'Ошибка загрузки заказа' }
      };
      const state2 = orderReducer(state1, rejectedAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.error).toBe('Ошибка загрузки заказа');
    });

    it('должен использовать сообщение по умолчанию, если ошибка не содержит message', () => {
      const pendingAction = { type: fetchOrderByNumber.pending.type };
      const state1 = orderReducer(initialState, pendingAction);

      const rejectedAction = {
        type: fetchOrderByNumber.rejected.type,
        error: {}
      };
      const state2 = orderReducer(state1, rejectedAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.error).toBe('Ошибка загрузки заказа');
    });
  });
});


