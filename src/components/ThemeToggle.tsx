import React from 'react';
import styled from 'styled-components/native';
import { useThemeMode } from '../theme/ThemeModeProvider';

const Row = styled.View`
  flex-direction: row;
  gap: 8px;
`;
const Chip = styled.TouchableOpacity<{ active?: boolean }>`
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid
    ${({ theme, active }) => (active ? theme.accent : theme.border)};
  background-color: ${({ theme, active }) =>
    active ? theme.surface : 'transparent'};
`;
const Txt = styled.Text`
  color: ${({ theme }) => theme.textPrimary};
`;

export default function ThemeToggle() {
  const { mode, setMode } = useThemeMode();
  return (
    <Row>
      <Chip active={mode === 'system'} onPress={() => setMode('system')}>
        <Txt>System</Txt>
      </Chip>
      <Chip active={mode === 'light'} onPress={() => setMode('light')}>
        <Txt>Light</Txt>
      </Chip>
      <Chip active={mode === 'dark'} onPress={() => setMode('dark')}>
        <Txt>Dark</Txt>
      </Chip>
    </Row>
  );
}
