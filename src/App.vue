<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import router from './router'

const { t, locale } = useI18n()
const showMobileMenu = ref(false)
const isScrolled = ref(false)

// Robust URL cleanup function for GitHub Pages
const cleanupUrl = () => {
  const location = window.location

  // Only clean up infinite redirect loops with many ~and~ parameters
  if (
    location.search &&
    location.search.includes('~and~') &&
    location.search.split('~and~').length > 3
  ) {
    // Extract the path from the query parameter (GitHub Pages SPA pattern)
    const pathMatch = location.search.match(/\?\/(.*?)($|&|~and~)/)
    if (pathMatch && pathMatch[1]) {
      // Get just the clean path without parameters
      const cleanPath = '/' + pathMatch[1].split('&')[0].split('~and~')[0]
      // Replace URL with the clean path
      window.history.replaceState(null, null, cleanPath)
      return
    }
  }

  // DO NOT clean up /?/ pattern on initial load - let the router handle it
  // Only clean up once navigation has completed
}

// This function should be called after navigation is complete
const cleanupUrlAfterNavigation = () => {
  const location = window.location

  // Now it's safe to clean up the URL if it still has the /?/ format
  if (location.search && location.search.includes('/?/')) {
    // Extract the path
    const pathMatch = location.search.match(/\?\/(.*?)($|&|~and~)/)
    if (pathMatch && pathMatch[1]) {
      let cleanPath = '/' + pathMatch[1].split('&')[0].split('~and~')[0]

      // Clean up any percent encoding or unwanted characters
      try {
        cleanPath = decodeURIComponent(cleanPath)
      } catch (e) {
        // If decoding fails, use the raw path
        console.error('Failed to decode URL', e)
      }

      // Remove any remaining % characters
      cleanPath = cleanPath.replace(/%/g, '')

      window.history.replaceState(null, null, cleanPath)
    }
  }

  // Also handle direct pathname issues with percent characters
  if (location.pathname.includes('%')) {
    let cleanPath = location.pathname

    // Clean up any percent encoding or unwanted characters
    try {
      cleanPath = decodeURIComponent(cleanPath)
    } catch (e) {
      // If decoding fails, use the raw path
      console.error('Failed to decode URL', e)
    }

    // Remove any remaining % characters
    cleanPath = cleanPath.replace(/%/g, '')

    window.history.replaceState(null, null, cleanPath)
  }
}

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'lv' : 'en'
  localStorage.setItem('language', locale.value)
  // Call simplified URL cleanup
  cleanupUrl()
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  // Clean up only redirect loops on initial load
  cleanupUrl()

  // Listen for router changes to clean up URL after navigation
  router.afterEach(() => {
    // Now it's safe to clean up the URL
    cleanupUrlAfterNavigation()
  })

  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
        @click="toggleMobileMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav :class="{ 'mobile-open': showMobileMenu }">
        <button
          class="language-toggle"
          @click="toggleLanguage"
          :class="{ active: locale === 'en' }"
        >
          <span class="lang-option" :class="{ selected: locale === 'lv' }">LV</span>
          <span class="lang-separator">/</span>
          <span class="lang-option" :class="{ selected: locale === 'en' }">EN</span>
        </button>
        <RouterLink to="/" @click="showMobileMenu = false">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/portfolio" @click="showMobileMenu = false">{{
          t('nav.portfolio')
        }}</RouterLink>
        <RouterLink to="/biography" @click="showMobileMenu = false">{{
          t('nav.biography')
        }}</RouterLink>
        <RouterLink to="/contact" @click="showMobileMenu = false">{{
          t('nav.contact')
        }}</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>&copy; {{ new Date().getFullYear() }} Ilze Brenn</p>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500&display=swap');

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
  background-color: #1a1714;
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
  transition: all 0.4s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

header.scrolled {
  background-color: rgba(26, 23, 20, 0.92);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.logo a {
  font-size: 1.8rem;
  font-weight: 300;
  color: white;
  text-decoration: none;
  letter-spacing: 2px;
  transition: color 0.3s ease;
  font-family: 'Cormorant Garamond', serif;
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
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 400;
  position: relative;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  font-family: 'Raleway', sans-serif;
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
  background-color: var(--accent-clay, #c78c60);
  transition: width 0.3s cubic-bezier(0.65, 0, 0.35, 1);
  opacity: 0.9;
}

nav a:hover::after,
nav a.router-link-active::after {
  width: 100%;
}

.language-toggle {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 0;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-family: 'Raleway', sans-serif;
}

header.scrolled .language-toggle {
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
}

.language-toggle:hover {
  background-color: rgba(199, 140, 96, 0.1);
  border-color: var(--accent-clay, #c78c60);
}

header.scrolled .language-toggle:hover {
  background-color: rgba(199, 140, 96, 0.1);
}

.lang-option {
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.lang-option.selected {
  opacity: 1;
  font-weight: 500;
  color: var(--accent-clay, #c78c60);
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
  background-color: white;
  transition: all 0.3s ease;
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

@media (min-width: 1400px) {
  html,
  body,
  #app,
  .app-container,
  main {
    width: 100vw;
    margin: 0;
    padding: 0;
  }
}

footer {
  background-color: rgba(26, 23, 20, 0.98);
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 2rem;
  font-size: 0.9rem;
  position: relative;
  font-family: 'Raleway', sans-serif;
  border-top: 1px solid rgba(199, 140, 96, 0.2);
}

footer::before {
  content: '';
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 5px;
  background: linear-gradient(to right, transparent, var(--accent-clay, #c78c60), transparent);
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
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
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
    color: white;
    font-size: 2rem;
    margin: 0.8rem 0;
    padding: 0.5rem 0;
    opacity: 0.8;
    font-family: 'Cormorant Garamond', serif;
    text-align: center;
  }

  nav a:hover,
  nav a.router-link-active {
    opacity: 1;
    color: var(--accent-clay, #c78c60);
  }

  nav a::after {
    height: 1px;
    bottom: -2px;
  }

  .language-toggle {
    margin: 2rem auto 0;
    border-color: rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
  }

  .mobile-menu-toggle span {
    width: 100%;
    height: 2px;
    background-color: white;
    transition: all 0.3s ease;
  }

  .mobile-menu-toggle.active span {
    background-color: white;
  }
}

nav a:hover::after,
nav a.router-link-active::after {
  width: 100%;
}

nav a:hover {
  opacity: 0.7;
}
</style>
