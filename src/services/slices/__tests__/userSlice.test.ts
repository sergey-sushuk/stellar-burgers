import userReducer, {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser,
  setAuthChecked,
  initialState
} from '../userSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

const mockUser2: TUser = {
  email: 'test2@example.com',
  name: 'Test User 2'
};

describe('userSlice reducer', () => {
  describe('синхронные редьюсеры', () => {
    it('должен установить isAuthChecked', () => {
      const action = setAuthChecked(true);
      const state = userReducer(initialState, action);

      expect(state.isAuthChecked).toBe(true);
    });

    it('должен сбросить isAuthChecked', () => {
      const stateWithAuth = {
        ...initialState,
        isAuthChecked: true
      };
      const action = setAuthChecked(false);
      const state = userReducer(stateWithAuth, action);

      expect(state.isAuthChecked).toBe(false);
    });
  });

  describe('registerUser', () => {
    it('должен установить isLoading в true при начале запроса', () => {
      const action = { type: registerUser.pending.type };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен установить isLoading в false и сохранить пользователя при успешной регистрации', () => {
      const pendingAction = { type: registerUser.pending.type };
      const state1 = userReducer(initialState, pendingAction);

      const fulfilledAction = {
        type: registerUser.fulfilled.type,
        payload: mockUser
      };
      const state2 = userReducer(state1, fulfilledAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.user).toEqual(mockUser);
      expect(state2.isAuthChecked).toBe(true);
      expect(state2.error).toBeNull();
    });

    it('должен установить isLoading в false и сохранить ошибку при неудачной регистрации', () => {
      const pendingAction = { type: registerUser.pending.type };
      const state1 = userReducer(initialState, pendingAction);

      const rejectedAction = {
        type: registerUser.rejected.type,
        error: { message: 'Ошибка регистрации' }
      };
      const state2 = userReducer(state1, rejectedAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.error).toBe('Ошибка регистрации');
    });
  });

  describe('loginUser', () => {
    it('должен установить isLoading в true при начале запроса', () => {
      const action = { type: loginUser.pending.type };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен установить isLoading в false и сохранить пользователя при успешном входе', () => {
      const pendingAction = { type: loginUser.pending.type };
      const state1 = userReducer(initialState, pendingAction);

      const fulfilledAction = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const state2 = userReducer(state1, fulfilledAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.user).toEqual(mockUser);
      expect(state2.isAuthChecked).toBe(true);
      expect(state2.error).toBeNull();
    });

    it('должен установить isLoading в false и сохранить ошибку при неудачном входе', () => {
      const pendingAction = { type: loginUser.pending.type };
      const state1 = userReducer(initialState, pendingAction);

      const rejectedAction = {
        type: loginUser.rejected.type,
        error: { message: 'Ошибка входа' }
      };
      const state2 = userReducer(state1, rejectedAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.error).toBe('Ошибка входа');
    });
  });

  describe('getUser', () => {
    it('должен установить isLoading в true при начале запроса', () => {
      const action = { type: getUser.pending.type };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });

    it('должен установить isLoading в false и сохранить пользователя при успешном запросе', () => {
      const pendingAction = { type: getUser.pending.type };
      const state1 = userReducer(initialState, pendingAction);

      const fulfilledAction = {
        type: getUser.fulfilled.type,
        payload: mockUser
      };
      const state2 = userReducer(state1, fulfilledAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.user).toEqual(mockUser);
      expect(state2.isAuthChecked).toBe(true);
    });

    it('должен установить isLoading в false и очистить пользователя при неудачном запросе', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser
      };
      const pendingAction = { type: getUser.pending.type };
      const state1 = userReducer(stateWithUser, pendingAction);

      const rejectedAction = {
        type: getUser.rejected.type
      };
      const state2 = userReducer(state1, rejectedAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.user).toBeNull();
      expect(state2.isAuthChecked).toBe(true);
    });
  });

  describe('updateUser', () => {
    it('должен установить isLoading в true при начале запроса', () => {
      const action = { type: updateUser.pending.type };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен установить isLoading в false и обновить пользователя при успешном обновлении', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser
      };
      const pendingAction = { type: updateUser.pending.type };
      const state1 = userReducer(stateWithUser, pendingAction);

      const fulfilledAction = {
        type: updateUser.fulfilled.type,
        payload: mockUser2
      };
      const state2 = userReducer(state1, fulfilledAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.user).toEqual(mockUser2);
      expect(state2.error).toBeNull();
    });

    it('должен установить isLoading в false и сохранить ошибку при неудачном обновлении', () => {
      const pendingAction = { type: updateUser.pending.type };
      const state1 = userReducer(initialState, pendingAction);

      const rejectedAction = {
        type: updateUser.rejected.type,
        error: { message: 'Ошибка обновления данных' }
      };
      const state2 = userReducer(state1, rejectedAction);

      expect(state2.isLoading).toBe(false);
      expect(state2.error).toBe('Ошибка обновления данных');
    });
  });

  describe('logoutUser', () => {
    it('должен очистить пользователя и установить isAuthChecked в true при успешном выходе', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser,
        isAuthChecked: true
      };

      const fulfilledAction = {
        type: logoutUser.fulfilled.type
      };
      const state = userReducer(stateWithUser, fulfilledAction);

      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(true);
    });
  });
});


