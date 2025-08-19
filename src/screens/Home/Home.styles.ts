import styled from 'styled-components/native';

export const HomeContainer = styled.View({
  flex: 1,
});

export const ChangeModePress = styled.TouchableOpacity({
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  width: 160,
  borderWidth: 0.5,
  paddingVertical: 6,
  marginVertical: 8,
});

export const ChangeModeText = styled.Text(({ theme }) => ({
  color: theme.textPrimary,
  fontSize: 17,
  fontWeight: '500',
  textAlign: 'center',
}));

export const PressableBookGrid = styled.TouchableOpacity({
  flex: 1,
  margin: 6,
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 10,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
});

export const PressableBookList = styled.Pressable({
  flexDirection: 'row',
  alignItems: 'center',
  padding: 12,
  gap: 12,
  margin: 6,
  backgroundColor: '#fff',
  borderRadius: 10,
});

export const SearchInput = styled.TextInput({
  margin: 12,
  padding: 10,
  backgroundColor: '#eee',
  borderRadius: 10,
});

export const GridCoverImage = styled.Image({
  width: '100%',
  aspectRatio: 2 / 3,
  borderRadius: 6,
  marginBottom: 8,
});

export const ListCoverImage = styled.Image({
  width: 60,
  height: 90,
  borderRadius: 6,
});

export const RightAligned = styled.View({
  alignItems: 'flex-end',
  marginTop: 8,
});

export const ItemSeparator = styled.View({
  height: 1,
  backgroundColor: '#eee',
});

export const Flex1 = styled.View({
  flex: 1,
});

export const BookTitle = styled.Text({
  fontWeight: '600',
});

export const StateText = styled.Text({
  padding: 16,
});
