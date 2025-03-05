<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="home">
    <div class="hero">
      <h1 class="artist-name">{{ t('home.title') }}</h1>
      <p class="artist-title">{{ t('home.subtitle') }}</p>
    </div>

    <div class="featured-works">
      <div class="work-preview funguy">
        <div class="work-info">
          <h2>Fun-guy</h2>
          <router-link to="/portfolio" class="view-more">{{ t('nav.portfolio') }}</router-link>
        </div>
      </div>

      <div class="work-preview rainbow">
        <div class="work-info">
          <h2>Varavīksnene</h2>
          <router-link to="/portfolio" class="view-more">{{ t('nav.portfolio') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.hero {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-image: url(`${import.meta.env.BASE_URL}images/hero-bg.jpg`);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
  width: 100%;
}

.artist-name {
  font-size: 4rem;
  font-weight: 300;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  color: white;
  position: relative;
  z-index: 2;
  text-align: center;
  width: 100%;
  padding: 0 1rem;
}

.artist-title {
  font-size: 1.8rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 1px;
  position: relative;
  z-index: 2;
  text-align: center;
  width: 100%;
  padding: 0 1rem;
}

.featured-works {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  margin: 0;
  padding: 0;
}

.work-preview {
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
  border-radius: 0;
  box-shadow: none;
}

.work-preview:hover {
  transform: translateY(-5px);
}

.work-preview.funguy {
  background-image: url(`${import.meta.env.BASE_URL}images/funguy1.jpg`);
}

.work-preview.rainbow {
  background-image: url(`${import.meta.env.BASE_URL}images/rainbow-full.jpg`);
}

.work-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
}

.work-info h2 {
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}

.view-more {
  display: inline-block;
  color: white;
  text-decoration: none;
  border-bottom: 1px solid white;
  padding-bottom: 2px;
  transition: opacity 0.3s ease;
}

.view-more:hover {
  opacity: 0.8;
  background-color: transparent;
}

@media (min-width: 768px) {
  .featured-works {
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
  }

  .artist-name {
    font-size: 4rem;
  }

  .artist-title {
    font-size: 1.8rem;
  }
}

@media (min-width: 1400px) {
  .featured-works {
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
  }

  .work-preview {
    height: 450px;
  }

  .artist-name {
    font-size: 4.5rem;
  }

  .artist-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .artist-name {
    font-size: 3rem;
    padding: 0 1.5rem;
    margin-bottom: 0.5rem;
  }

  .artist-title {
    font-size: 1.5rem;
    padding: 0 1.5rem;
  }
}
</style>
