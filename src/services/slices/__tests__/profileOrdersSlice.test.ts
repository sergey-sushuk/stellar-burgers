import profileOrdersReducer, {
  fetchProfileOrders,
  initialState
} from '../profileOrdersSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 12345,
    ingredients: ['ingredient-1', 'ingredient-2']
  },
  {
    _id: 'order-2',
    status: 'pending',
    name: 'Био-марсианский бургер',
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z',
    number: 12346,
    ingredients: ['ingredient-3']
  }
];

describe('profileOrdersSlice reducer', () => {
  describe('fetchProfileOrders.pending', () => {
    it('должен установить isLoading в true при начале запроса', () => {
      const action = { type: fetchProfileOrders.pending.type };
      const state = profileOrdersReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен очистить ошибку при начале нового запроса', () => {
      const stateWithError = {
        ...initialState,
        error: 'Предыдущая ошибка'
      };
      const action = { type: fetchProfileOrders.pending.type };
      const state = profileOrdersReducer(stateWithError, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe('fetchProfileOrders.fulfilled', () => {
    it('должен установить isLoading в false и сохранить данные при успешном запросе', () => {
      const pendingAction = { type: fetchProfileOrders.pending.type };
      const state1 = profileOrdersReducer(initialState, pendingAction);

      const fulfilledAction = {
        type: fetchProfileOrders.fulfilled.type,
        payload: mockOrders
      };
      const state2 = profileOrdersReducer(state1, fulfilledAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.orders).toEqual(mockOrders);
      expect(state2.orders).toHaveLength(2);
      expect(state2.error).toBeNull();
    });

    it('должен заменить существующие данные новыми', () => {
      const stateWithData = {
        orders: [
          {
            _id: 'old-order',
            status: 'done',
            name: 'Старый заказ',
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
            number: 1,
            ingredients: []
          }
        ],
        isLoading: false,
        error: null
      };

      const fulfilledAction = {
        type: fetchProfileOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = profileOrdersReducer(stateWithData, fulfilledAction);

      expect(state.orders).toEqual(mockOrders);
      expect(state.orders).toHaveLength(2);
      expect(state.orders[0]._id).toBe('order-1');
    });
  });

  describe('fetchProfileOrders.rejected', () => {
    it('должен установить isLoading в false и сохранить ошибку при неудачном запросе', () => {
      const pendingAction = { type: fetchProfileOrders.pending.type };
      const state1 = profileOrdersReducer(initialState, pendingAction);

      const rejectedAction = {
        type: fetchProfileOrders.rejected.type,
        error: { message: 'Ошибка загрузки заказов' }
      };
      const state2 = profileOrdersReducer(state1, rejectedAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.error).toBe('Ошибка загрузки заказов');
      expect(state2.orders).toEqual([]);
    });

    it('должен использовать сообщение по умолчанию, если ошибка не содержит message', () => {
      const pendingAction = { type: fetchProfileOrders.pending.type };
      const state1 = profileOrdersReducer(initialState, pendingAction);

      const rejectedAction = {
        type: fetchProfileOrders.rejected.type,
        error: {}
      };
      const state2 = profileOrdersReducer(state1, rejectedAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.error).toBe('Ошибка загрузки заказов');
    });

    it('не должен изменять существующие данные при ошибке', () => {
      const stateWithData = {
        orders: mockOrders,
        isLoading: true,
        error: null
      };

      const rejectedAction = {
        type: fetchProfileOrders.rejected.type,
        error: { message: 'Ошибка сети' }
      };
      const state = profileOrdersReducer(stateWithData, rejectedAction);

      expect(state.orders).toEqual(mockOrders);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка сети');
    });
  });
});


