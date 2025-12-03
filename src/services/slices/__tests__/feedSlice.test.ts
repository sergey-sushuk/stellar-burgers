import feedReducer, { fetchFeeds, initialState } from '../feedSlice';
import { TOrdersData } from '@utils-types';

const mockFeedsData: TOrdersData = {
  orders: [
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
  ],
  total: 100,
  totalToday: 10
};

describe('feedSlice reducer', () => {
  describe('fetchFeeds.pending', () => {
    it('должен установить isLoading в true при начале запроса', () => {
      const action = { type: fetchFeeds.pending.type };
      const state = feedReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен очистить ошибку при начале нового запроса', () => {
      const stateWithError = {
        ...initialState,
        error: 'Предыдущая ошибка'
      };
      const action = { type: fetchFeeds.pending.type };
      const state = feedReducer(stateWithError, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe('fetchFeeds.fulfilled', () => {
    it('должен установить isLoading в false и сохранить данные при успешном запросе', () => {
      const pendingAction = { type: fetchFeeds.pending.type };
      const state1 = feedReducer(initialState, pendingAction);

      const fulfilledAction = {
        type: fetchFeeds.fulfilled.type,
        payload: mockFeedsData
      };
      const state2 = feedReducer(state1, fulfilledAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.orders).toEqual(mockFeedsData.orders);
      expect(state2.total).toBe(mockFeedsData.total);
      expect(state2.totalToday).toBe(mockFeedsData.totalToday);
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
        total: 1,
        totalToday: 1,
        isLoading: false,
        error: null
      };

      const fulfilledAction = {
        type: fetchFeeds.fulfilled.type,
        payload: mockFeedsData
      };
      const state = feedReducer(stateWithData, fulfilledAction);

      expect(state.orders).toEqual(mockFeedsData.orders);
      expect(state.orders).toHaveLength(2);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(10);
    });
  });

  describe('fetchFeeds.rejected', () => {
    it('должен установить isLoading в false и сохранить ошибку при неудачном запросе', () => {
      const pendingAction = { type: fetchFeeds.pending.type };
      const state1 = feedReducer(initialState, pendingAction);

      const rejectedAction = {
        type: fetchFeeds.rejected.type,
        error: { message: 'Ошибка загрузки ленты заказов' }
      };
      const state2 = feedReducer(state1, rejectedAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.error).toBe('Ошибка загрузки ленты заказов');
      expect(state2.orders).toEqual([]);
    });

    it('должен использовать сообщение по умолчанию, если ошибка не содержит message', () => {
      const pendingAction = { type: fetchFeeds.pending.type };
      const state1 = feedReducer(initialState, pendingAction);

      const rejectedAction = {
        type: fetchFeeds.rejected.type,
        error: {}
      };
      const state2 = feedReducer(state1, rejectedAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.error).toBe('Ошибка загрузки ленты заказов');
    });

    it('не должен изменять существующие данные при ошибке', () => {
      const stateWithData = {
        orders: mockFeedsData.orders,
        total: mockFeedsData.total,
        totalToday: mockFeedsData.totalToday,
        isLoading: true,
        error: null
      };

      const rejectedAction = {
        type: fetchFeeds.rejected.type,
        error: { message: 'Ошибка сети' }
      };
      const state = feedReducer(stateWithData, rejectedAction);

      expect(state.orders).toEqual(mockFeedsData.orders);
      expect(state.total).toBe(mockFeedsData.total);
      expect(state.totalToday).toBe(mockFeedsData.totalToday);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка сети');
    });
  });
});


