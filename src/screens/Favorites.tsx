import React, { useMemo } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectFavoriteIds } from '../features/favoritesSlice';
import { useGetBooksQuery } from '../api/booksApi';

export default function Favorites({ navigation }: any) {
  const favIds = useSelector((s: RootState) => selectFavoriteIds(s));
  const favSet = useMemo(() => new Set(favIds), [favIds]);

  const { data: books, isLoading } = useGetBooksQuery();

  const favBooks = useMemo(
    () => (books ?? []).filter(b => favSet.has(b.number)),
    [books, favSet],
  );

  if (isLoading) return <Text style={{ padding: 16 }}>טוען ספרים…</Text>;
  if (!favBooks.length)
    return (
      <View style={{ padding: 16 }}>
        <Text>אין מועדפים עדיין</Text>
      </View>
    );

  return (
    <FlatList
      data={favBooks}
      keyExtractor={b => String(b.number)}
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
  );
}
