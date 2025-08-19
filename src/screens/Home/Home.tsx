import { NavigationProps } from '../../types/navigation';
import React, { useMemo, useCallback, useState } from 'react';
import { useGetBooksQuery } from '../../api/booksApi';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
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
  BookGrid,
  ChangeModePress,
  ChangeModeText,
  HomeContainer,
  SearchInput,
  StateText,
} from './Home.styles';
import GridBookItem from '../../components/GridBookItem/GridBookItem';
import ListBookItem from '../../components/ListBookItem/ListBookItem';
import { ScrollView } from 'react-native';

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

  if (isLoading) return <StateText>{t('HOME_PAGE.loading_books')}</StateText>;
  if (isError)
    return <StateText>{t('HOME_PAGE.error_loading_books')}</StateText>;

  return (
    <HomeContainer>
      <LanguageSwitcher />
      <ChangeModePress onPress={() => setGrid(prev => !prev)}>
        <ChangeModeText>{t('HOME_PAGE.switch_display')}</ChangeModeText>
      </ChangeModePress>
      <SearchInput
        placeholder={t('HOME_PAGE.search_by_title')}
        value={searchText}
        onChangeText={setSearchText}
      />
      <DropDownSort sortBy={sortBy} onChange={setSortBy} />
      <ScrollView contentContainerStyle={{ padding: 8 }}>
        {isGrid ? (
          <BookGrid>
            {sortedList.map(item => (
              <GridBookItem
                key={item.number}
                book={item}
                isFav={favSet.has(item.number)}
                onPress={() => handleRowPress(item.number, item.title)}
                onToggleFavorite={() => handleToggleFavoritePress(item.number)}
              />
            ))}
          </BookGrid>
        ) : (
          sortedList.map(item => (
            <ListBookItem
              key={item.number}
              book={item}
              isFav={favSet.has(item.number)}
              onPress={() => handleRowPress(item.number, item.title)}
              onToggleFavorite={() => handleToggleFavoritePress(item.number)}
            />
          ))
        )}
      </ScrollView>
    </HomeContainer>
  );
};

export default Home;
