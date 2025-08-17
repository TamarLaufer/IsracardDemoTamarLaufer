import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabsParamList>;
  BookDetails: { number: number };
};

export type NavigationProps = CompositeScreenProps<
  BottomTabScreenProps<TabsParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

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
