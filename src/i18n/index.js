import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import lv from '../locales/lv.json'

// Get the stored language or default to Latvian
const storedLang = localStorage.getItem('language') || 'lv'

export default createI18n({
  legacy: false,
  locale: storedLang,
  fallbackLocale: 'lv',
  messages: {
    en,
    lv,
  },
})
