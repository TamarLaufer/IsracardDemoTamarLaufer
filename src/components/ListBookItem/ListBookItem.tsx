import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import {
  ListCoverImage,
  BookTitle,
  Flex1,
} from '../../screens/Home/Home.styles';
import FavoriteButton from './../FavoriteButton';
import { Book } from '../../types/navigation';

type Props = {
  book: Book;
  isFav: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  style?: ViewStyle;
};

const ListBookItem = ({
  book,
  isFav,
  onPress,
  onToggleFavorite,
  style,
}: Props) => (
  <TouchableOpacity
    style={[
      {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 12,
        backgroundColor: 'white',
        marginBottom: 10,
      },
      style,
    ]}
    onPress={onPress}
  >
    <ListCoverImage
      source={{
        uri: book.cover || 'https://via.placeholder.com/60x90?text=No+Image',
      }}
    />
    <Flex1>
      <BookTitle numberOfLines={1}>{book.title}</BookTitle>
      <Text>{book.releaseDate}</Text>
    </Flex1>
    <FavoriteButton isFav={isFav} onToggle={onToggleFavorite} />
  </TouchableOpacity>
);

export default ListBookItem;
