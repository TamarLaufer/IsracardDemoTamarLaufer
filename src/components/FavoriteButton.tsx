import React from 'react';
import { Pressable, Text } from 'react-native';

type Props = { isFav: boolean; onToggle: () => void; size?: number };

const FavoriteButton = ({ isFav, onToggle, size = 30 }: Props) => {
  return (
    <Pressable onPress={onToggle} hitSlop={10}>
      <Text style={{ fontSize: size }}>{isFav ? '★' : '☆'}</Text>
    </Pressable>
  );
};

export default FavoriteButton;
