import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectFavoriteIds } from '../features/favoritesSlice';
import { useGetBooksQuery } from '../api/booksApi';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

export default function Favorites({ navigation }: any) {
  const favIds = useSelector((s: RootState) => selectFavoriteIds(s));
  const favSet = useMemo(() => new Set(favIds), [favIds]);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebouncedValue(searchText, 300);

  const { data: books, isLoading, isError } = useGetBooksQuery();

  const favBooks = useMemo(
    () => (books ?? []).filter(book => favSet.has(book.number)),
    [books, favSet],
  );

  const filteredFavBooks = useMemo(() => {
    const normalizedQuery = debouncedSearchText.trim().toLowerCase();
    if (!normalizedQuery) return favBooks;

    return favBooks.filter(book => {
      const title = (book.title ?? '').toLowerCase();
      const description = (book.description ?? '').toLowerCase();
      return (
        title.includes(normalizedQuery) || description.includes(normalizedQuery)
      );
    });
  }, [favBooks, debouncedSearchText]);

  if (isLoading) return <Text style={{ padding: 16 }}>טוען ספרים...</Text>;

  if (isError) return <Text style={{ padding: 16 }}>שגיאה בטעינת הספרים </Text>;

  if (!favBooks.length)
    return (
      <View style={{ padding: 16 }}>
        <Text>אין מועדפים עדיין</Text>
      </View>
    );

  return (
    <>
      <TextInput
        placeholder="חיפוש לפי שם הספר או תיאור"
        value={searchText}
        onChangeText={setSearchText}
        style={{
          margin: 12,
          padding: 10,
          backgroundColor: '#eee',
          borderRadius: 10,
        }}
      />
      <FlatList
        data={filteredFavBooks}
        keyExtractor={b => String(b.number)}
        ListEmptyComponent={
          <Text style={{ padding: 16 }}>לא נמצאו תוצאות לחיפוש</Text>
        }
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: '#eee' }} />
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate('BookDetails', { number: item.number })
            }
            style={{
              flexDirection: 'row',
              padding: 12,
              gap: 12,
              alignItems: 'center',
            }}
          >
            <Image
              source={{ uri: item.cover }}
              style={{ width: 60, height: 90, borderRadius: 6 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600' }} numberOfLines={1}>
                {item.title}
              </Text>
              <Text>{item.releaseDate}</Text>
            </View>
            <Text>★</Text>
          </Pressable>
        )}
      />
    </>
  );
}
