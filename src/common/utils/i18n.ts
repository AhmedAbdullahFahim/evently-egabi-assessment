import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

const resources = {
  en: {
    translation: {
      appName: 'EGABI Events',
      search: 'Search',
      keyword: 'Keyword',
      city: 'City',
      favourites: 'Favourites',
      addFavourite: 'Add to Favourites',
      removeFavourite: 'Remove Favourite',
      profile: 'Profile',
      language: 'Language',
      english: 'English',
      arabic: 'Arabic',
      login: 'Login',
      signup: 'Sign Up',
    },
  },
  ar: {
    translation: {
      appName: 'EGABI Events',
      search: 'بحث',
      keyword: 'كلمة البحث',
      city: 'المدينة',
      favourites: 'المفضلة',
      addFavourite: 'إضافة للمفضلة',
      removeFavourite: 'إزالة من المفضلة',
      profile: 'الملف الشخصي',
      language: 'اللغة',
      english: 'الإنجليزية',
      arabic: 'العربية',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
    },
  },
};

const fallbackLng = 'en';
const deviceLng = RNLocalize.getLocales()[0]?.languageCode === 'ar' ? 'ar' : 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLng || fallbackLng,
  fallbackLng,
  compatibilityJSON: 'v3',
  interpolation: { escapeValue: false },
});

export default i18n;




