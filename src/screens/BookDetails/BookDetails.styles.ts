import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

export const StateWrap = styled.View`
  flex: 1;
  padding: 16px;
  gap: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

export const StateText = styled.Text`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 20;
  font-weight: 500;
`;

export const TitleText = styled.Text`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 20;
  font-weight: 700;
`;

export const DetailText = styled.Text`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 18;
  font-weight: 400;
`;

export const StyledScroll = styled(ScrollView).attrs({
  contentContainerStyle: {
    padding: 16,
    gap: 12,
  },
})``;
