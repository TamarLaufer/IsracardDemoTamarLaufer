import { Book, NavigationProps } from '../../types/navigation';
import React, { useMemo, useCallback, useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { useGetBooksQuery } from '../../api/booksApi';
import { FlashList } from '@shopify/flash-list';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import FavoriteButton from '../../components/FavoriteButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  selectFavoriteIds,
  toggleFavorite,
} from '../../features/favoritesSlice';
import DropDownSort from '../../components/DropDownSort';
import { sortBooks, SortBy } from '../../functions';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import {
  ChangeModePress,
  ChangeModeText,
  HomeContainer,
  PressableBookGrid,
  PressableBookList,
} from './Home.styles';

const Home = ({ navigation }: NavigationProps) => {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebouncedValue(searchText, 300);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.TITLE_AZ);
  const favIds = useSelector((state: RootState) => selectFavoriteIds(state));
  const favSet = useMemo(() => new Set(favIds), [favIds]);
  const [isGrid, setGrid] = useState(false);

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
    (id: number, title?: string) => {
      navigation.navigate('BookDetails', { number: id, title });
    },
    [navigation],
  );

  const renderBookItem = useCallback(
    ({ item }: { item: Book }) => {
      const isFav = favSet.has(item.number);

      if (isGrid) {
        return (
          <PressableBookGrid
            onPress={() => handleRowPress(item.number, item.title)}
            style={{}}
          >
            <Image
              source={{
                uri:
                  item.cover ||
                  'https://via.placeholder.com/300x450?text=No+Image',
              }}
              style={{
                width: '100%',
                aspectRatio: 2 / 3,
                borderRadius: 6,
                marginBottom: 8,
              }}
              resizeMode="cover"
            />
            <Text style={{ fontWeight: '600' }} numberOfLines={3}>
              {item.title}
            </Text>
            <Text>{item.releaseDate}</Text>
            <View style={{ alignItems: 'flex-end', marginTop: 8 }}>
              <FavoriteButton
                isFav={isFav}
                onToggle={() => handleToggleFavoritePress(item.number)}
              />
            </View>
          </PressableBookGrid>
        );
      }

      return (
        <PressableBookList
          onPress={() => handleRowPress(item.number, item.title)}
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
        </PressableBookList>
      );
    },
    [favSet, handleRowPress, handleToggleFavoritePress, isGrid],
  );

  if (isLoading)
    return <Text style={{ padding: 16 }}>{t('HOME_PAGE.loading_books')}</Text>;
  if (isError)
    return (
      <Text style={{ padding: 16 }}>{t('HOME_PAGE.error_loading_books')}</Text>
    );

  return (
    <HomeContainer>
      <LanguageSwitcher />
      <ChangeModePress onPress={() => setGrid(!isGrid)}>
        <ChangeModeText>{t('HOME_PAGE.switch_display')}</ChangeModeText>
      </ChangeModePress>
      <TextInput
        placeholder={t('HOME_PAGE.search_by_title')}
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
        estimatedItemSize={isGrid ? 260 : 110}
        numColumns={isGrid ? 3 : 1}
        contentContainerStyle={{ padding: isGrid ? 6 : 0 }}
        keyboardShouldPersistTaps="handled"
        extraData={[favIds, isGrid]}
        ItemSeparatorComponent={
          !isGrid
            ? () => <View style={{ height: 1, backgroundColor: '#eee' }} />
            : undefined
        }
        ListEmptyComponent={
          <Text style={{ padding: 16 }}>{t('HOME_PAGE.no_books_found')}</Text>
        }
        renderItem={renderBookItem}
      />
    </HomeContainer>
  );
};

export default Home;
