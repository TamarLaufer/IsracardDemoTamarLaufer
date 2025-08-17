import { Book, NavigationProps } from '../types/navigation';
import React, { useMemo, useCallback, useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { useGetBooksQuery } from '../api/booksApi';
import { FlashList } from '@shopify/flash-list';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import FavoriteButton from '../components/FavoriteButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectFavoriteIds, toggleFavorite } from '../features/favoritesSlice';
import DropDownSort from '../components/DropDownSort';
import { sortBooks, SortBy } from '../functions';

const Home = ({ navigation }: NavigationProps) => {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebouncedValue(searchText, 300);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.TITLE_AZ);
  const favIds = useSelector((state: RootState) => selectFavoriteIds(state));
  const favSet = useMemo(() => new Set(favIds), [favIds]);

  const list = useMemo(() => {
    const normalizedQuery = debouncedSearchText.trim().toLowerCase();
    return (books ?? []).filter(book =>
      (book.title ?? '').toLowerCase().includes(normalizedQuery),
    );
  }, [books, debouncedSearchText]);

  const sortedList = useMemo(() => sortBooks(list, sortBy), [list, sortBy]);

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

  const renderBookItem = useCallback(
    ({ item }: { item: Book }) => {
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
                item.cover || 'https://via.placeholder.com/60x90?text=No+Image',
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
    },
    [favSet, handleRowPress, handleToggleFavoritePress],
  );

  if (isLoading) return <Text style={{ padding: 16 }}>טוען ספרים...</Text>;
  if (isError) return <Text style={{ padding: 16 }}>שגיאה בטעינת ספרים</Text>;

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="חיפוש לפי שם הספר"
        value={searchText}
        onChangeText={setSearchText}
        style={{
          margin: 12,
          padding: 10,
          backgroundColor: '#eee',
          borderRadius: 10,
        }}
      />
      <DropDownSort sortBy={sortBy} onChange={setSortBy} />
      <FlashList<Book>
        data={sortedList}
        keyExtractor={item => String(item.number)}
        estimatedItemSize={110}
        keyboardShouldPersistTaps={'handled'}
        extraData={favIds}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: '#eee' }} />
        )}
        ListEmptyComponent={<Text style={{ padding: 16 }}>לא נמצאו ספרים</Text>}
        renderItem={renderBookItem}
      />
    </View>
  );
};

export default Home;
