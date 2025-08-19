import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

export const StateWrap = styled.View(({ theme }) => ({
  flex: 1,
  padding: 16,
  gap: 8,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.background,
}));

export const StateText = styled.Text(({ theme }) => ({
  color: theme.textPrimary,
  fontSize: 20,
  fontWeight: '500',
}));

export const TitleText = styled.Text(({ theme }) => ({
  color: theme.textPrimary,
  fontSize: 20,
  fontWeight: '700',
}));

export const DetailText = styled.Text(({ theme }) => ({
  color: theme.textPrimary,
  fontSize: 18,
  fontWeight: '400',
}));

export const StyledScroll = styled(ScrollView)({});

export const ScrollInner = styled.View({
  padding: 16,
  gap: 12,
});

export const CoverImage = styled.Image({
  resizeMode: 'cover',
  width: 180,
  height: 260,
  alignSelf: 'center',
  borderRadius: 8,
  marginVertical: 8,
});
