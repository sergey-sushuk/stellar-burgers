import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  initialState
} from '../constructorSlice';
import { TIngredient } from '@utils-types';

const mockBun: TIngredient = {
  _id: 'bun-1',
  name: 'Краторная булка',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://example.com/bun.png',
  image_mobile: 'https://example.com/bun-mobile.png',
  image_large: 'https://example.com/bun-large.png'
};

const mockMain: TIngredient = {
  _id: 'main-1',
  name: 'Биокотлета',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://example.com/main.png',
  image_mobile: 'https://example.com/main-mobile.png',
  image_large: 'https://example.com/main-large.png'
};

const mockSauce: TIngredient = {
  _id: 'sauce-1',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://example.com/sauce.png',
  image_mobile: 'https://example.com/sauce-mobile.png',
  image_large: 'https://example.com/sauce-large.png'
};

describe('constructorSlice reducer', () => {

  describe('добавление ингредиента', () => {
    it('должен добавить булку в конструктор', () => {
      const action = addBun(mockBun);
      const state = constructorReducer(initialState, action);

      expect(state.bun).toBeDefined();
      expect(state.bun?._id).toBe(mockBun._id);
      expect(state.bun?.name).toBe(mockBun.name);
      expect(state.bun?.id).toBeDefined();
    });

    it('должен заменить существующую булку новой', () => {
      const firstAction = addBun(mockBun);
      const firstState = constructorReducer(initialState, firstAction);

      const newBun: TIngredient = {
        ...mockBun,
        _id: 'bun-2',
        name: 'Новая булка'
      };
      const secondAction = addBun(newBun);
      const secondState = constructorReducer(firstState, secondAction);

      expect(secondState.bun?._id).toBe('bun-2');
      expect(secondState.bun?.name).toBe('Новая булка');
    });

    it('должен добавить начинку в конструктор', () => {
      const action = addIngredient(mockMain);
      const state = constructorReducer(initialState, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]._id).toBe(mockMain._id);
      expect(state.ingredients[0].name).toBe(mockMain.name);
      expect(state.ingredients[0].id).toBeDefined();
    });

    it('должен добавить несколько начинок в конструктор', () => {
      const firstAction = addIngredient(mockMain);
      const firstState = constructorReducer(initialState, firstAction);

      const secondAction = addIngredient(mockSauce);
      const secondState = constructorReducer(firstState, secondAction);

      expect(secondState.ingredients).toHaveLength(2);
      expect(secondState.ingredients[0]._id).toBe(mockMain._id);
      expect(secondState.ingredients[1]._id).toBe(mockSauce._id);
    });
  });

  describe('удаление ингредиента', () => {
    it('должен удалить ингредиент по id', () => {
      const addAction1 = addIngredient(mockMain);
      const state1 = constructorReducer(initialState, addAction1);
      const ingredientId1 = state1.ingredients[0].id;

      const addAction2 = addIngredient(mockSauce);
      const state2 = constructorReducer(state1, addAction2);
      const ingredientId2 = state2.ingredients[1].id;

      const removeAction = removeIngredient(ingredientId1);
      const state3 = constructorReducer(state2, removeAction);

      expect(state3.ingredients).toHaveLength(1);
      expect(state3.ingredients[0].id).toBe(ingredientId2);
      expect(state3.ingredients[0]._id).toBe(mockSauce._id);
    });

    it('должен оставить массив пустым, если удалить единственный ингредиент', () => {
      const addAction = addIngredient(mockMain);
      const state1 = constructorReducer(initialState, addAction);
      const ingredientId = state1.ingredients[0].id;

      const removeAction = removeIngredient(ingredientId);
      const state2 = constructorReducer(state1, removeAction);

      expect(state2.ingredients).toHaveLength(0);
    });

    it('не должен изменить состояние, если ингредиент с таким id не найден', () => {
      const addAction = addIngredient(mockMain);
      const state1 = constructorReducer(initialState, addAction);

      const removeAction = removeIngredient('non-existent-id');
      const state2 = constructorReducer(state1, removeAction);

      expect(state2).toEqual(state1);
    });
  });

  describe('изменение порядка ингредиентов', () => {
    it('должен переместить ингредиент с одной позиции на другую', () => {
      // Добавляем три ингредиента
      const addAction1 = addIngredient(mockMain);
      const state1 = constructorReducer(initialState, addAction1);

      const addAction2 = addIngredient(mockSauce);
      const state2 = constructorReducer(state1, addAction2);

      const mockMain2: TIngredient = {
        ...mockMain,
        _id: 'main-2',
        name: 'Вторая котлета'
      };
      const addAction3 = addIngredient(mockMain2);
      const state3 = constructorReducer(state2, addAction3);

      // Сохраняем id для проверки
      const firstId = state3.ingredients[0].id;
      const secondId = state3.ingredients[1].id;
      const thirdId = state3.ingredients[2].id;

      // Перемещаем первый элемент на третью позицию
      const moveAction = moveIngredient({ dragIndex: 0, hoverIndex: 2 });
      const state4 = constructorReducer(state3, moveAction);

      expect(state4.ingredients).toHaveLength(3);
      expect(state4.ingredients[0].id).toBe(secondId);
      expect(state4.ingredients[1].id).toBe(thirdId);
      expect(state4.ingredients[2].id).toBe(firstId);
    });

    it('должен переместить ингредиент с последней позиции на первую', () => {
      const addAction1 = addIngredient(mockMain);
      const state1 = constructorReducer(initialState, addAction1);

      const addAction2 = addIngredient(mockSauce);
      const state2 = constructorReducer(state1, addAction2);

      const firstId = state2.ingredients[0].id;
      const secondId = state2.ingredients[1].id;

      const moveAction = moveIngredient({ dragIndex: 1, hoverIndex: 0 });
      const state3 = constructorReducer(state2, moveAction);

      expect(state3.ingredients[0].id).toBe(secondId);
      expect(state3.ingredients[1].id).toBe(firstId);
    });

    it('не должен изменить порядок, если индексы одинаковые', () => {
      const addAction1 = addIngredient(mockMain);
      const state1 = constructorReducer(initialState, addAction1);

      const addAction2 = addIngredient(mockSauce);
      const state2 = constructorReducer(state1, addAction2);

      const moveAction = moveIngredient({ dragIndex: 0, hoverIndex: 0 });
      const state3 = constructorReducer(state2, moveAction);

      expect(state3.ingredients).toEqual(state2.ingredients);
    });
  });

  describe('очистка конструктора', () => {
    it('должен очистить все ингредиенты и булку', () => {
      const addBunAction = addBun(mockBun);
      const state1 = constructorReducer(initialState, addBunAction);

      const addIngredientAction = addIngredient(mockMain);
      const state2 = constructorReducer(state1, addIngredientAction);

      const clearAction = clearConstructor();
      const state3 = constructorReducer(state2, clearAction);

      expect(state3.bun).toBeNull();
      expect(state3.ingredients).toHaveLength(0);
    });
  });
});


