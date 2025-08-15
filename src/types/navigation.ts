import type { NavigatorScreenParams } from '@react-navigation/native';
import type { Book } from '../api/booksApi';
export type { Book } from '../api/booksApi';

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabsParamList>;
  BookDetails: { book: Book };
};

export type TabsParamList = {
  Home: undefined;
  Favorites: undefined;
};
