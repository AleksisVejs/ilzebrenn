<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const showMobileMenu = ref(false)
const isScrolled = ref(false)

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'lv' : 'en'
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
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
        <RouterLink to="/" @click="showMobileMenu = false">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/portfolio" @click="showMobileMenu = false">{{
          t('nav.portfolio')
        }}</RouterLink>
        <RouterLink to="/biography" @click="showMobileMenu = false">{{
          t('nav.biography')
        }}</RouterLink>
        <button class="language-toggle" @click="toggleLanguage">
          {{ locale === 'en' ? 'LV' : 'EN' }}
        </button>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>&copy; {{ new Date().getFullYear() }} Ilze Erba-Brenholma</p>
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
  background-color: #000;
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
  transition: background-color 0.3s ease;
}

header.scrolled {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.logo a {
  font-size: 1.8rem;
  font-weight: 300;
  color: white;
  text-decoration: none;
  letter-spacing: 2px;
  transition: color 0.3s ease;
}

header.scrolled .logo a {
  color: #333;
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
  transition: color 0.3s ease;
}

header.scrolled nav a {
  color: #333;
}

nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: white;
  transition:
    width 0.3s ease,
    background-color 0.3s ease;
}

header.scrolled nav a::after {
  background-color: #333;
}

.language-toggle {
  background: none;
  border: 1px solid white;
  color: white;
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

header.scrolled .language-toggle {
  border-color: #333;
  color: #333;
}

.language-toggle:hover {
  background-color: white;
  color: #333;
}

header.scrolled .language-toggle:hover {
  background-color: #333;
  color: white;
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

header.scrolled .mobile-menu-toggle span {
  background-color: #333;
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
  text-align: center;
  padding: 2rem;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  font-size: 0.9rem;
  color: #666;
  width: 100%;
  margin: 0;
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
    background-color: rgba(255, 255, 255, 0.95);
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    transform: translateX(100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    z-index: 1000;
  }

  nav.mobile-open {
    transform: translateX(0);
    opacity: 1;
    pointer-events: all;
  }

  nav a,
  header.scrolled nav a {
    color: #333;
    font-size: 1.5rem;
    margin: 1rem 0;
  }

  .language-toggle {
    margin-top: 1rem;
    border-color: #333;
    color: #333;
  }
}

nav a:hover::after,
nav a.router-link-active::after {
  width: 100%;
}
</style>
