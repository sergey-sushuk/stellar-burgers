import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

describe('ingredientsSlice reducer', () => {
  const initialState = {
    items: [],
    isLoading: false,
    error: null
  };

  describe('fetchIngredients.pending', () => {
    it('должен установить isLoading в true при начале запроса', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен очистить ошибку при начале нового запроса', () => {
      const stateWithError = {
        ...initialState,
        error: 'Предыдущая ошибка'
      };
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsReducer(stateWithError, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe('fetchIngredients.fulfilled', () => {
    it('должен установить isLoading в false и сохранить данные при успешном запросе', () => {
      const pendingAction = { type: fetchIngredients.pending.type };
      const state1 = ingredientsReducer(initialState, pendingAction);

      const fulfilledAction = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state2 = ingredientsReducer(state1, fulfilledAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.items).toEqual(mockIngredients);
      expect(state2.items).toHaveLength(2);
      expect(state2.error).toBeNull();
    });

    it('должен заменить существующие данные новыми', () => {
      const stateWithData = {
        items: [
          {
            _id: 'old-id',
            name: 'Старый ингредиент',
            type: 'main',
            proteins: 0,
            fat: 0,
            carbohydrates: 0,
            calories: 0,
            price: 0,
            image: '',
            image_mobile: '',
            image_large: ''
          }
        ],
        isLoading: false,
        error: null
      };

      const fulfilledAction = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = ingredientsReducer(stateWithData, fulfilledAction);

      expect(state.items).toEqual(mockIngredients);
      expect(state.items).toHaveLength(2);
      expect(state.items[0]._id).toBe('643d69a5c3f7b9001cfa093c');
    });
  });

  describe('fetchIngredients.rejected', () => {
    it('должен установить isLoading в false и сохранить ошибку при неудачном запросе', () => {
      const pendingAction = { type: fetchIngredients.pending.type };
      const state1 = ingredientsReducer(initialState, pendingAction);

      const rejectedAction = {
        type: fetchIngredients.rejected.type,
        error: { message: 'Ошибка загрузки ингредиентов' }
      };
      const state2 = ingredientsReducer(state1, rejectedAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.error).toBe('Ошибка загрузки ингредиентов');
      expect(state2.items).toEqual([]);
    });

    it('должен использовать сообщение по умолчанию, если ошибка не содержит message', () => {
      const pendingAction = { type: fetchIngredients.pending.type };
      const state1 = ingredientsReducer(initialState, pendingAction);

      const rejectedAction = {
        type: fetchIngredients.rejected.type,
        error: {}
      };
      const state2 = ingredientsReducer(state1, rejectedAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.error).toBe('Ошибка загрузки ингредиентов');
    });

    it('не должен изменять существующие данные при ошибке', () => {
      const stateWithData = {
        items: mockIngredients,
        isLoading: true,
        error: null
      };

      const rejectedAction = {
        type: fetchIngredients.rejected.type,
        error: { message: 'Ошибка сети' }
      };
      const state = ingredientsReducer(stateWithData, rejectedAction);

      expect(state.items).toEqual(mockIngredients);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка сети');
    });
  });
});

