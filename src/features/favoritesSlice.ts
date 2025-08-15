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

export const selectFavoriteIds = (s: { favorites?: { ids?: number[] } }) =>
  Array.isArray(s.favorites?.ids) ? s.favorites!.ids : [];
export const isFavorite = (s: { favorites: FavoritesState }, id: number) =>
  s.favorites.ids.includes(id);
