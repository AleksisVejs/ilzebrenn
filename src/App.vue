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

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  showScrollTop.value = window.scrollY > 400
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

onMounted(() => {
  document.documentElement.lang = locale.value
  cleanupUrl()
  router.afterEach(() => {
    cleanupUrlAfterNavigation()
  })
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('keydown', handleKeydown)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="app-container">
    <header :class="{ scrolled: isScrolled }">
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
        <button
          class="language-toggle"
          @click="toggleLanguage"
          :aria-label="locale === 'lv' ? 'Switch to English' : 'Pārslēgt uz latviešu'"
        >
          <span class="lang-option" :class="{ selected: locale === 'lv' }">LV</span>
          <span class="lang-separator">/</span>
          <span class="lang-option" :class="{ selected: locale === 'en' }">EN</span>
        </button>
        <RouterLink to="/" @click="closeMobileMenu">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/portfolio" @click="closeMobileMenu">{{ t('nav.portfolio') }}</RouterLink>
        <RouterLink to="/biography" @click="closeMobileMenu">{{ t('nav.biography') }}</RouterLink>
        <RouterLink to="/contact" @click="closeMobileMenu">{{ t('nav.contact') }}</RouterLink>
      </nav>
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>

    <footer>
      <p>&copy; {{ new Date().getFullYear() }} Ilze Brenn</p>
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
  background-image: linear-gradient(to bottom, rgba(26, 23, 20, 0.97), rgba(26, 23, 20, 0.95));
  background-blend-mode: overlay;
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
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  transition: all var(--transition-bounce);
  border-bottom: 1px solid var(--border-subtle);
}

header.scrolled {
  background-color: var(--bg-primary-92);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.logo a {
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--text-primary);
  text-decoration: none;
  letter-spacing: 2px;
  transition: color var(--transition-smooth);
  font-family: var(--font-heading);
}

header.scrolled .logo a {
  color: rgba(255, 255, 255, 0.95);
}

nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

nav a {
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 400;
  position: relative;
  padding: 0.5rem 0;
  transition: all var(--transition-smooth);
  font-family: var(--font-body);
}

header.scrolled nav a {
  color: rgba(255, 255, 255, 0.9);
}

nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--accent-clay);
  transition: width 0.3s cubic-bezier(0.65, 0, 0.35, 1);
  opacity: 0.9;
}

nav a:hover::after,
nav a.router-link-active::after {
  width: 100%;
}

nav a:hover {
  opacity: 0.7;
}

.language-toggle {
  background: none;
  border: 1px solid var(--border-medium);
  color: var(--text-primary);
  border-radius: 0;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--transition-smooth);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--font-body);
}

header.scrolled .language-toggle {
  border-color: var(--border-medium);
  color: rgba(255, 255, 255, 0.9);
}

.language-toggle:hover {
  background-color: var(--accent-clay-light);
  border-color: var(--accent-clay);
}

.lang-option {
  opacity: 0.6;
  transition: opacity var(--transition-smooth);
}

.lang-option.selected {
  opacity: 1;
  font-weight: 500;
  color: var(--accent-clay);
}

.lang-separator {
  opacity: 0.4;
}

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
  height: 2px;
  background-color: var(--text-primary);
  transition: all var(--transition-smooth);
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Scroll to top button */
.scroll-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 44px;
  height: 44px;
  background-color: var(--bg-primary-92);
  border: 1px solid var(--border-light);
  color: var(--accent-clay);
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
  background-color: var(--accent-clay);
  color: var(--text-primary);
  border-color: var(--accent-clay);
  transform: translateY(-3px);
}

footer {
  background-color: rgba(26, 23, 20, 0.98);
  color: var(--text-muted);
  text-align: center;
  padding: 2rem;
  font-size: 0.9rem;
  position: relative;
  font-family: var(--font-body);
  border-top: 1px solid var(--border-accent);
}

footer::before {
  content: '';
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 5px;
  background: linear-gradient(to right, transparent, var(--accent-clay), transparent);
}

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
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.25);
  }

  nav.mobile-open {
    transform: translateX(0);
    opacity: 1;
    pointer-events: all;
  }

  nav a {
    color: var(--text-primary);
    font-size: 2rem;
    margin: 0.8rem 0;
    padding: 0.5rem 0;
    opacity: 0.8;
    font-family: var(--font-heading);
    text-align: center;
  }

  nav a:hover,
  nav a.router-link-active {
    opacity: 1;
    color: var(--accent-clay);
  }

  nav a::after {
    height: 1px;
    bottom: -2px;
  }

  .language-toggle {
    margin: 2rem auto 0;
    border-color: var(--border-medium);
    color: var(--text-primary);
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
  }

  .mobile-menu-toggle span {
    width: 100%;
    height: 2px;
    background-color: var(--text-primary);
    transition: all var(--transition-smooth);
  }

  .mobile-menu-toggle.active span {
    background-color: var(--text-primary);
  }
}
</style>
