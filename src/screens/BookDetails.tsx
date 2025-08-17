import React, { useCallback, useLayoutEffect } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { useGetBooksQuery } from '../api/booksApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectFavoriteIds, toggleFavorite } from '../features/favoritesSlice';
import FavoriteButton from '../components/FavoriteButton';

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'BookDetails'
>;

export default function BookDetails({ route, navigation }: NavigationProps) {
  const { number } = route.params;

  const { book, isLoading, isError } = useGetBooksQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      book: data?.find(oneBook => oneBook.number === number),
      isLoading,
      isError,
    }),
  });

  const favIds = useSelector((state: RootState) => selectFavoriteIds(state));
  const isFav = favIds.includes(number);

  const dispatch = useDispatch();

  const onToggleFav = useCallback(() => {
    dispatch(toggleFavorite(number));
  }, [dispatch, number]);

  // useLayoutEffect is used instead of useEffect to avoid a visible flicker in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: book?.title ?? 'Book',
      headerRight: () => (
        <FavoriteButton isFav={isFav} onToggle={onToggleFav} />
      ),
    });
  }, [navigation, book?.title, isFav, onToggleFav]);

  if (isLoading) {
    return (
      <View style={{ padding: 16, gap: 8 }}>
        <ActivityIndicator />
        <Text>טוען...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ padding: 16 }}>
        <Text>שגיאה בטעינת הספר, יש לנסות מאוחר יותר</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={{ padding: 16 }}>
        <Text>לא נמצא ספר</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Image
        source={{
          uri:
            book.cover || 'https://via.placeholder.com/180x260?text=No+Image',
        }}
        style={{
          width: 180,
          height: 260,
          alignSelf: 'center',
          borderRadius: 8,
          marginBottom: 8,
        }}
      />

      <Text style={{ fontSize: 22, fontWeight: '700' }}>{book.title}</Text>
      <Text>Release: {book.releaseDate}</Text>
      {book.pages != null ? <Text>Pages: {book.pages}</Text> : null}
      {book.description ? <Text>{book.description}</Text> : null}
    </ScrollView>
  );
}
