import styled from 'styled-components/native';

export const Screen = styled.View({
  flex: 1,
});

export const SearchInput = styled.TextInput({
  margin: 12,
  padding: 10,
  backgroundColor: '#eee',
  borderRadius: 10,
});

export const ItemSeparator = styled.View({
  height: 1,
  backgroundColor: '#eee',
});

export const PaddedText = styled.Text({
  padding: 16,
});

export const EmptyWrap = styled.View({
  padding: 16,
});

export const FavoriteRowPress = styled.Pressable({
  flexDirection: 'row',
  alignItems: 'center',
  padding: 12,
  gap: 12,
});

export const CoverThumb = styled.Image({
  width: 60,
  height: 90,
  borderRadius: 6,
});

export const Flex1 = styled.View({
  flex: 1,
});

export const BookTitle = styled.Text({
  fontWeight: '600',
});
