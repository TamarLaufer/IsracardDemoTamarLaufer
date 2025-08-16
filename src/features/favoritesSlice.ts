import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FavoritesState = { ids: number[] };

const initialState: FavoritesState = { ids: [] };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<number>) {
      if (!Array.isArray(state.ids)) state.ids = [];
      const id = action.payload;
      if (!Number.isFinite(id)) return;
      const i = state.ids.indexOf(id);
      if (i >= 0) state.ids.splice(i, 1);
      else state.ids.push(id);
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.ids = state.ids.filter(x => x !== action.payload);
    },
    clearFavorites(state) {
      state.ids = [];
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;

//Selectors
export const selectFavoriteIds = (state: { favorites?: { ids?: number[] } }) =>
  Array.isArray(state.favorites?.ids) ? state.favorites!.ids : [];

export const isFavorite = (state: { favorites: FavoritesState }, id: number) =>
  state.favorites.ids.includes(id);
