import { Book, NavigationProps } from '../../types/navigation';
import React, { useMemo, useCallback, useState } from 'react';
import { Text } from 'react-native';
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
import DropDownSort from '../../components/DropDownSort/DropDownSort';
import { sortBooks, SortBy } from '../../functions';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import {
  BookTitle,
  ChangeModePress,
  ChangeModeText,
  Flex1,
  GridCoverImage,
  HomeContainer,
  ItemSeparator,
  ListCoverImage,
  PressableBookGrid,
  PressableBookList,
  RightAligned,
  SearchInput,
  StateText,
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
          >
            <GridCoverImage
              source={{
                uri:
                  item.cover ||
                  'https://via.placeholder.com/300x450?text=No+Image',
              }}
              resizeMode="cover"
            />
            <BookTitle numberOfLines={3}>{item.title}</BookTitle>
            <Text>{item.releaseDate}</Text>
            <RightAligned>
              <FavoriteButton
                isFav={isFav}
                onToggle={() => handleToggleFavoritePress(item.number)}
              />
            </RightAligned>
          </PressableBookGrid>
        );
      }

      return (
        <PressableBookList
          onPress={() => handleRowPress(item.number, item.title)}
        >
          <ListCoverImage
            source={{
              uri:
                item.cover || 'https://via.placeholder.com/60x90?text=No+Image',
            }}
          />
          <Flex1>
            <BookTitle numberOfLines={1}>{item.title}</BookTitle>
            <Text>{item.releaseDate}</Text>
          </Flex1>
          <FavoriteButton
            isFav={isFav}
            onToggle={() => handleToggleFavoritePress(item.number)}
          />
        </PressableBookList>
      );
    },
    [favSet, handleRowPress, handleToggleFavoritePress, isGrid],
  );

  if (isLoading) return <StateText>{t('HOME_PAGE.loading_books')}</StateText>;
  if (isError)
    return <StateText>{t('HOME_PAGE.error_loading_books')}</StateText>;

  return (
    <HomeContainer>
      <LanguageSwitcher />
      <ChangeModePress onPress={() => setGrid(!isGrid)}>
        <ChangeModeText>{t('HOME_PAGE.switch_display')}</ChangeModeText>
      </ChangeModePress>
      <SearchInput
        placeholder={t('HOME_PAGE.search_by_title')}
        value={searchText}
        onChangeText={setSearchText}
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
        ItemSeparatorComponent={!isGrid ? () => <ItemSeparator /> : undefined}
        ListEmptyComponent={
          <StateText>{t('HOME_PAGE.no_books_found')}</StateText>
        }
        renderItem={renderBookItem}
      />
    </HomeContainer>
  );
};

export default Home;
