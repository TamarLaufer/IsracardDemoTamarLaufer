import React from 'react';
import { ActivityIndicator, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import { useTranslation } from 'react-i18next';
import {
  DetailText,
  StateText,
  StateWrap,
  StyledScroll,
  TitleText,
} from './BookDetails.styles';

import { useGetBooksQuery } from '../../api/booksApi';

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'BookDetails'
>;

export default function BookDetails({ route }: NavigationProps) {
  const { number } = route.params;
  const { t } = useTranslation();
  const { book, isLoading, isError } = useGetBooksQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      book: data?.find(oneBook => oneBook.number === number),
      isLoading,
      isError,
    }),
  });

  if (isLoading) {
    return (
      <StateWrap>
        <ActivityIndicator />
        <StateText>{t('BOOK_DETAILS_PAGE.loading')}</StateText>
      </StateWrap>
    );
  }

  if (isError) {
    return (
      <StateWrap>
        <StateText>{t('BOOK_DETAILS_PAGE.error_loading_book')}</StateText>
      </StateWrap>
    );
  }

  if (!book) {
    return (
      <StateWrap>
        <StateText>{t('BOOK_DETAILS_PAGE.not_found')}</StateText>
      </StateWrap>
    );
  }

  return (
    <StyledScroll>
      <TitleText>{t('BOOK_DETAILS_PAGE.about_book')}</TitleText>
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
          marginVertical: 8,
        }}
      />

      <TitleText>{book.title}</TitleText>
      <DetailText> {book.releaseDate}</DetailText>
      {book.pages != null ? <DetailText>Pages: {book.pages}</DetailText> : null}
      {book.description ? <DetailText>{book.description}</DetailText> : null}
    </StyledScroll>
  );
}
