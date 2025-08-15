import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';

import favorites from '../features/favoritesSlice'; // ← שימי לב לייבוא הנכון
import { booksApi } from '../api/booksApi';

const rootReducer = combineReducers({
  favorites,
  [booksApi.reducerPath]: booksApi.reducer,
});

const persistConfig = {
  key: 'root',
  version: 2,
  storage: AsyncStorage,
  whitelist: ['favorites'],
  migrate: (state: any) => {
    if (!state) return Promise.resolve(state);
    const f = state.favorites;
    if (!f || !Array.isArray(f.ids)) {
      return Promise.resolve({ ...state, favorites: { ids: [] } });
    }
    return Promise.resolve(state);
  },
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: g => g({ serializableCheck: false }).concat(booksApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
