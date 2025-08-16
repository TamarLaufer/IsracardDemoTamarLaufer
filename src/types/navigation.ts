import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabsParamList>;
  BookDetails: { number: number };
};

export type TabsParamList = {
  Home: undefined;
  Favorites: undefined;
};

export type Book = {
  number: number;
  title: string;
  releaseDate: string;
  cover: string;
  description?: string;
  pages?: number;
};
