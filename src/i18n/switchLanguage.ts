import i18n from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function switchLanguage(lang: 'he' | 'en') {
  await AsyncStorage.setItem('app_lang', lang);
  await i18n.changeLanguage(lang);
}
