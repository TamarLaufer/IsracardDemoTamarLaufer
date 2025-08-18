import React from 'react';
import { Pressable, Text } from 'react-native';

type FavoriteButtonPropsType = {
  isFav: boolean;
  onToggle: () => void;
  size?: number;
};

const FavoriteButton = ({
  isFav,
  onToggle,
  size = 30,
}: FavoriteButtonPropsType) => {
  return (
    <Pressable onPress={onToggle} hitSlop={10}>
      <Text style={{ fontSize: size }}>{isFav ? '★' : '☆'}</Text>
    </Pressable>
  );
};

export default FavoriteButton;
