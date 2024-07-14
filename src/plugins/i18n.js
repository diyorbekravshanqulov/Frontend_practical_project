import ru from '../lang/ru'
import uz from '../lang/uz'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'uz',
  fallbackLocale: 'uz',
  messages: {
    ru, uz
  }
})

export default i18n