<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import router from './router'

const { t, locale } = useI18n()
const showMobileMenu = ref(false)
const isScrolled = ref(false)
const showScrollTop = ref(false)

const cleanupUrl = () => {
  const location = window.location
  if (
    location.search &&
    location.search.includes('~and~') &&
    location.search.split('~and~').length > 3
  ) {
    const pathMatch = location.search.match(/\?\/(.*?)($|&|~and~)/)
    if (pathMatch && pathMatch[1]) {
      const cleanPath = '/' + pathMatch[1].split('&')[0].split('~and~')[0]
      window.history.replaceState(null, null, cleanPath)
      return
    }
  }
}

const cleanupUrlAfterNavigation = () => {
  const location = window.location
  if (location.search && location.search.includes('/?/')) {
    const pathMatch = location.search.match(/\?\/(.*?)($|&|~and~)/)
    if (pathMatch && pathMatch[1]) {
      let cleanPath = '/' + pathMatch[1].split('&')[0].split('~and~')[0]
      try {
        cleanPath = decodeURIComponent(cleanPath)
      } catch (e) {
        console.error('Failed to decode URL', e)
      }
      cleanPath = cleanPath.replace(/%/g, '')
      window.history.replaceState(null, null, cleanPath)
    }
  }
  if (location.pathname.includes('%')) {
    let cleanPath = location.pathname
    try {
      cleanPath = decodeURIComponent(cleanPath)
    } catch (e) {
      console.error('Failed to decode URL', e)
    }
    cleanPath = cleanPath.replace(/%/g, '')
    window.history.replaceState(null, null, cleanPath)
  }
}

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'lv' : 'en'
  localStorage.setItem('language', locale.value)
  document.documentElement.lang = locale.value
  cleanupUrl()
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (showMobileMenu.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
  document.body.style.overflow = ''
}

let scrollTicking = false
const handleScroll = () => {
  if (scrollTicking) return
  scrollTicking = true
  requestAnimationFrame(() => {
    isScrolled.value = window.scrollY > 50
    showScrollTop.value = window.scrollY > 400
    scrollTicking = false
  })
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && showMobileMenu.value) {
    closeMobileMenu()
  }
}

watch(locale, (newLocale) => {
  document.documentElement.lang = newLocale
})

let removeAfterEach = null

onMounted(() => {
  document.documentElement.lang = locale.value
  cleanupUrl()
  removeAfterEach = router.afterEach(() => {
    cleanupUrlAfterNavigation()
  })
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  requestAnimationFrame(() => {
    handleScroll()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  if (removeAfterEach) removeAfterEach()
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="app-container">
    <header :class="{ scrolled: isScrolled }">
      <div class="header-inner">
        <div class="logo">
          <RouterLink to="/">ilzebrenn</RouterLink>
        </div>

        <button
          class="mobile-menu-toggle"
          :class="{ active: showMobileMenu }"
          :aria-label="showMobileMenu ? 'Close menu' : 'Open menu'"
          aria-controls="main-nav"
          :aria-expanded="showMobileMenu"
          @click="toggleMobileMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav id="main-nav" :class="{ 'mobile-open': showMobileMenu }" role="navigation" :aria-label="t('nav.home')">
          <RouterLink to="/" @click="closeMobileMenu">{{ t('nav.home') }}</RouterLink>
          <RouterLink to="/portfolio" @click="closeMobileMenu">{{ t('nav.portfolio') }}</RouterLink>
          <RouterLink to="/biography" @click="closeMobileMenu">{{ t('nav.biography') }}</RouterLink>
          <RouterLink to="/contact" @click="closeMobileMenu">{{ t('nav.contact') }}</RouterLink>
          <button
            class="language-toggle"
            @click="toggleLanguage"
            :aria-label="locale === 'lv' ? 'Switch to English' : 'Pārslēgt uz latviešu'"
          >
            <span class="lang-option" :class="{ selected: locale === 'lv' }">LV</span>
            <span class="lang-separator">/</span>
            <span class="lang-option" :class="{ selected: locale === 'en' }">EN</span>
          </button>
        </nav>
      </div>
    </header>

    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <button
      v-show="showScrollTop"
      class="scroll-top-btn"
      @click="scrollToTop"
      aria-label="Scroll to top"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>

    <footer>
      <div class="footer-inner">
        <span class="footer-name">Ilze Brenn</span>
        <span class="footer-copy">&copy; {{ new Date().getFullYear() }}</span>
      </div>
    </footer>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: var(--bg-primary);
}

#app {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.app-container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  position: relative;
}

main {
  flex: 1;
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ===== HEADER ===== */
header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  height: 70px;
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  transition: all var(--transition-bounce);
}

header.scrolled {
  background-color: rgba(26, 23, 20, 0.92);
  box-shadow: 0 1px 0 var(--border-subtle);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.header-inner {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--text-primary);
  text-decoration: none;
  letter-spacing: 3px;
  transition: color var(--transition-smooth);
  font-family: var(--font-heading);
}

.logo a:hover {
  color: var(--accent-clay);
}

nav {
  display: flex;
  gap: 0.3rem;
  align-items: center;
}

nav a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 400;
  position: relative;
  padding: 0.5rem 0.9rem;
  transition: color var(--transition-smooth);
  font-family: var(--font-body);
  letter-spacing: 0.5px;
}

nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0.9rem;
  right: 0.9rem;
  height: 1px;
  background-color: var(--accent-clay);
  transform: scaleX(0);
  transition: transform 0.3s cubic-bezier(0.65, 0, 0.35, 1);
}

nav a:hover,
nav a.router-link-active {
  color: var(--text-primary);
}

nav a:hover::after,
nav a.router-link-active::after {
  transform: scaleX(1);
}

.language-toggle {
  background: none;
  border: 1px solid var(--border-light);
  color: var(--text-muted);
  padding: 0.35rem 0.7rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all var(--transition-smooth);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-family: var(--font-body);
  margin-left: 0.6rem;
  letter-spacing: 0.5px;
}

.language-toggle:hover {
  border-color: var(--accent-clay);
  color: var(--text-primary);
}

.lang-option {
  opacity: 0.5;
  transition: opacity var(--transition-smooth);
}

.lang-option.selected {
  opacity: 1;
  color: var(--accent-clay);
}

.lang-separator {
  opacity: 0.3;
}

/* ===== MOBILE MENU ===== */
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 6px;
  padding: 5px;
  z-index: 1001;
  width: 30px;
  height: 30px;
  justify-content: center;
}

.mobile-menu-toggle span {
  display: block;
  width: 100%;
  height: 1.5px;
  background-color: var(--text-primary);
  transition: all var(--transition-smooth);
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: translateY(7.5px) rotate(45deg);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: translateY(-7.5px) rotate(-45deg);
}

/* ===== SCROLL TO TOP ===== */
.scroll-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 42px;
  height: 42px;
  background-color: rgba(26, 23, 20, 0.9);
  border: 1px solid var(--border-light);
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transition: all var(--transition-smooth);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.scroll-top-btn:hover {
  color: var(--accent-clay);
  border-color: var(--accent-clay);
  transform: translateY(-2px);
}

/* ===== FOOTER ===== */
footer {
  background-color: var(--bg-primary);
  color: var(--text-faint);
  padding: 2.5rem 2rem;
  position: relative;
  font-family: var(--font-body);
  border-top: 1px solid var(--border-subtle);
}

footer::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 1px;
  background: var(--accent-clay);
  opacity: 0.5;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-name {
  font-family: var(--font-heading);
  font-size: 1rem;
  letter-spacing: 2px;
  color: var(--text-muted);
}

.footer-copy {
  font-size: 0.8rem;
  letter-spacing: 0.5px;
}

/* ===== MOBILE ===== */
@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }

  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    background-color: rgba(26, 23, 20, 0.98);
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    transform: translateX(100%);
    opacity: 0;
    pointer-events: none;
    transition: all var(--transition-bounce);
    z-index: 1000;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    gap: 0;
  }

  nav.mobile-open {
    transform: translateX(0);
    opacity: 1;
    pointer-events: all;
  }

  nav a {
    color: var(--text-secondary);
    font-size: 1.8rem;
    padding: 0.8rem 0;
    font-family: var(--font-heading);
    text-align: center;
    letter-spacing: 1px;
  }

  nav a::after {
    left: 0;
    right: 0;
    bottom: 0.4rem;
  }

  nav a:hover,
  nav a.router-link-active {
    color: var(--accent-clay);
  }

  .language-toggle {
    margin: 2rem auto 0;
    margin-left: auto;
    margin-right: auto;
    border-color: var(--border-medium);
    color: var(--text-secondary);
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
  }

  .footer-inner {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
