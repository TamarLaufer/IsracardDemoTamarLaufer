import styled from 'styled-components/native';

export const Container = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-around',
  paddingHorizontal: 12,
  paddingVertical: 4,
});

export const ItemPressable = styled.Pressable({});

export const ItemLabel = styled.Text<{ active: boolean }>(({ active }) => ({
  padding: 8,
  fontWeight: active ? '700' : '400',
  color: active ? '#007AFF' : '#444',
}));
