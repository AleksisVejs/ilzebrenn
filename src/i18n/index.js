import { createI18n } from 'vue-i18n'
import lv from '../locales/lv.json'
import en from '../locales/en.json'

const storedLang = localStorage.getItem('language') || 'lv'

export default createI18n({
  legacy: false,
  locale: storedLang,
  fallbackLocale: 'lv',
  messages: { lv, en },
})
