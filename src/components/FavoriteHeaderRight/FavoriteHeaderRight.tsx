import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteButton from '../../components/FavoriteButton';
import { RootState } from '../../store';
import { toggleFavorite } from '../../features/favoritesSlice';

export default function FavoriteHeaderRight({ number }: { number: number }) {
  const isFav = useSelector((s: RootState) => s.favorites.ids.includes(number));
  const dispatch = useDispatch();
  const onToggle = useCallback(
    () => dispatch(toggleFavorite(number)),
    [dispatch, number],
  );

  return <FavoriteButton isFav={isFav} onToggle={onToggle} />;
}
