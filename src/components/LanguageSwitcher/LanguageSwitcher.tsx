import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { switchLanguage } from '../../i18n/switchLanguage';
import {
  ContainerLanguageSwitcher,
  LanguageSwitcherPress,
} from './LanguageSwitcher.styles';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const LANGS = ['he', 'en'] as const;
  const lang = (i18n.resolvedLanguage ?? i18n.language ?? '').toLowerCase();

  return (
    <ContainerLanguageSwitcher>
      {LANGS.map(code => (
        <LanguageSwitcherPress
          key={code}
          onPress={() => switchLanguage(code)}
          active={lang.startsWith(code)}
        >
          <Text>
            {t(code === 'he' ? 'COMMON.switch_to_he' : 'COMMON.switch_to_en')}
          </Text>
        </LanguageSwitcherPress>
      ))}
    </ContainerLanguageSwitcher>
  );
}
