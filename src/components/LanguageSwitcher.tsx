import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { switchLanguage } from '../i18n/switchLanguage';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const current = i18n.language?.startsWith('he') ? 'he' : 'en';

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Pressable
        onPress={() => switchLanguage('he')}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderWidth: 1,
          borderColor: current === 'he' ? '#333' : '#ccc',
          borderRadius: 8,
        }}
      >
        <Text>{t('COMMON.switch_to_he')}</Text>
      </Pressable>

      <Pressable
        onPress={() => switchLanguage('en')}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderWidth: 1,
          borderColor: current === 'en' ? '#333' : '#ccc',
          borderRadius: 8,
        }}
      >
        <Text>{t('COMMON.switch_to_en')}</Text>
      </Pressable>
    </View>
  );
}
