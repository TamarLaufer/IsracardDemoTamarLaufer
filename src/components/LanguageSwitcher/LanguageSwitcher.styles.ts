import styled from 'styled-components/native';

type LangBtnProps = { active: boolean };

export const ContainerLanguageSwitcher = styled.View({
  flexDirection: 'row',
  gap: 8,
});

export const LanguageSwitcherPress = styled.TouchableOpacity<LangBtnProps>(
  ({ active }) => ({
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: active ? '#333' : '#ccc',
    borderRadius: 8,
  }),
);
