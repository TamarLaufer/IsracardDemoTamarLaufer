import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type {
  Book,
  RootStackParamList,
  TabsParamList,
} from '../types/navigation';
import React, { useMemo, useCallback, useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { useGetBooksQuery } from '../api/booksApi';
import { FlashList } from '@shopify/flash-list';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import FavoriteButton from '../components/FavoriteButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectFavoriteIds, toggleFavorite } from '../features/favoritesSlice';

type NavigationProps = CompositeScreenProps<
  BottomTabScreenProps<TabsParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const Home = ({ navigation }: NavigationProps) => {
  const { data, isLoading, isError } = useGetBooksQuery();
  const dispatch = useDispatch();
  const [q, setQ] = useState('');
  const debouncedQ = useDebouncedValue(q, 300);

  const favIds = useSelector((s: RootState) => selectFavoriteIds(s));
  const favSet = useMemo(() => new Set(favIds), [favIds]);

  const list = useMemo(() => {
    const qNorm = debouncedQ.trim().toLowerCase();
    return (data ?? []).filter(b =>
      (b.title ?? '').toLowerCase().includes(qNorm),
    );
  }, [data, debouncedQ]);

  const handleToggleFavoritePress = useCallback(
    (id: number) => {
      dispatch(toggleFavorite(id));
    },
    [dispatch],
  );

  const handleRowPress = useCallback(
    (id: number) => {
      navigation.navigate('BookDetails', { number: id });
    },
    [navigation],
  );

  if (isLoading) return <Text style={{ padding: 16 }}>טוען ספרים…</Text>;
  if (isError) return <Text style={{ padding: 16 }}>שגיאה בטעינת ספרים</Text>;

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="חיפוש…"
        value={q}
        onChangeText={setQ}
        style={{
          margin: 12,
          padding: 10,
          backgroundColor: '#eee',
          borderRadius: 10,
        }}
      />

      <FlashList<Book>
        data={list}
        keyExtractor={item => String(item.number)}
        estimatedItemSize={110}
        extraData={favIds}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: '#eee' }} />
        )}
        ListEmptyComponent={<Text style={{ padding: 16 }}>לא נמצאו ספרים</Text>}
        renderItem={({ item }) => {
          const isFav = favSet.has(item.number);
          return (
            <Pressable
              onPress={() => handleRowPress(item.number)}
              style={{
                flexDirection: 'row',
                padding: 12,
                gap: 12,
                alignItems: 'center',
              }}
            >
              <Image
                source={{
                  uri:
                    item.cover ||
                    'https://via.placeholder.com/60x90?text=No+Image',
                }}
                style={{ width: 60, height: 90, borderRadius: 6 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600' }} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text>{item.releaseDate}</Text>
              </View>
              <FavoriteButton
                isFav={isFav}
                onToggle={() => handleToggleFavoritePress(item.number)}
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default Home;
