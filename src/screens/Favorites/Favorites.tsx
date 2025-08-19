import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectFavoriteIds } from '../../features/favoritesSlice';
import { useGetBooksQuery } from '../../api/booksApi';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { Book, NavigationProps } from '../../types/navigation';
import DropDownSort from '../../components/DropDownSort/DropDownSort';
import { sortBooks, SortBy } from '../../functions';
import { useTranslation } from 'react-i18next';
import {
  SearchInput,
  ItemSeparator,
  PaddedText,
  EmptyWrap,
  CoverThumb,
  Flex1,
  BookTitle,
} from '../Favorites/Favorites.styles';
import { FavoriteRowPress } from '../Favorites/Favorites.styles';

const Favorites = ({ navigation }: NavigationProps) => {
  const favIds = useSelector((state: RootState) => selectFavoriteIds(state));
  const favSet = useMemo(() => new Set(favIds), [favIds]);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebouncedValue(searchText, 300);
  const { t } = useTranslation();

  const [sortBy, setSortBy] = useState<SortBy>(SortBy.TITLE_AZ);
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

  const sortedBooks = useMemo(
    () => sortBooks(filteredFavBooks, sortBy),
    [filteredFavBooks, sortBy],
  );

  const renderFavoriteItem = useCallback(
    ({ item }: { item: Book }) => {
      return (
        <FavoriteRowPress
          onPress={() =>
            navigation.navigate('BookDetails', { number: item.number })
          }
        >
          <CoverThumb
            source={{
              uri:
                item.cover || 'https://via.placeholder.com/60x90?text=No+Image',
            }}
          />
          <Flex1>
            <BookTitle numberOfLines={1}>{item.title}</BookTitle>
            <Text>{item.releaseDate}</Text>
          </Flex1>
          <Text>★</Text>
        </FavoriteRowPress>
      );
    },
    [navigation],
  );

  if (isLoading)
    return <PaddedText>{t('FAVORITE_PAGE.loading_favorites')}</PaddedText>;

  if (isError)
    return (
      <PaddedText>{t('FAVORITE_PAGE.error_loading_favorites')}</PaddedText>
    );

  if (!favBooks.length)
    return (
      <EmptyWrap style={{ padding: 16 }}>
        <Text>{t('FAVORITE_PAGE.no_favorites_yet')}</Text>
      </EmptyWrap>
    );

  return (
    <>
      <SearchInput
        placeholder={t('FAVORITE_PAGE.search_by_title_or_desc')}
        value={searchText}
        onChangeText={setSearchText}
      />
      <DropDownSort sortBy={sortBy} onChange={setSortBy} />
      <FlatList<Book>
        data={sortedBooks}
        keyExtractor={book => String(book.number)}
        keyboardShouldPersistTaps={'handled'}
        ListEmptyComponent={
          <PaddedText>{t('FAVORITE_PAGE.no_results')}</PaddedText>
        }
        ItemSeparatorComponent={() => <ItemSeparator />}
        renderItem={renderFavoriteItem}
      />
    </>
  );
};

export default Favorites;
