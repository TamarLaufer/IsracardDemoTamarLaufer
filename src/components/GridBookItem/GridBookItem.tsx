import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import FavoriteButton from '../FavoriteButton';
import { Book } from '../../types/navigation';
import {
  BookTitle,
  GridCoverImage,
  RightAligned,
} from '../../screens/Home/Home.styles';

type Props = {
  book: Book;
  isFav: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  style?: ViewStyle;
};

const GridBookItem = ({
  book,
  isFav,
  onPress,
  onToggleFavorite,
  style,
}: Props) => (
  <TouchableOpacity
    style={[
      { width: '31%', marginBottom: 12, backgroundColor: 'white' },
      style,
    ]}
    onPress={onPress}
  >
    <GridCoverImage
      source={{
        uri: book.cover || 'https://via.placeholder.com/300x450?text=No+Image',
      }}
      resizeMode="cover"
    />
    <BookTitle numberOfLines={3}>{book.title}</BookTitle>
    <Text>{book.releaseDate}</Text>
    <RightAligned>
      <FavoriteButton isFav={isFav} onToggle={onToggleFavorite} />
    </RightAligned>
  </TouchableOpacity>
);

export default GridBookItem;
