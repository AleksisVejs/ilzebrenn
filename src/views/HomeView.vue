<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const navigateToPortfolio = () => {
  router.push('/portfolio')
}
</script>

<template>
  <div class="home">
    <div class="hero">
      <h1 class="artist-name">{{ t('home.title') }}</h1>
      <p class="artist-title">{{ t('home.subtitle') }}</p>
    </div>

    <div class="featured-works">
      <div @click="navigateToPortfolio" class="work-preview funguy">
        <div class="work-info">
          <div class="title-container">
            <h2>Fun-guy</h2>
          </div>
          <span class="view-more">{{ t('nav.portfolio') }}</span>
        </div>
      </div>

      <div @click="navigateToPortfolio" class="work-preview rainbow">
        <div class="work-info">
          <div class="title-container">
            <h2>Varavīksnene</h2>
          </div>
          <span class="view-more">{{ t('nav.portfolio') }}</span>
        </div>
      </div>

      <div @click="navigateToPortfolio" class="work-preview atgazend">
        <div class="work-info">
          <div class="title-container">
            <h2>Atgazend</h2>
          </div>
          <span class="view-more">{{ t('nav.portfolio') }}</span>
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
  background-image: url('/images/hero-bg.jpg');
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
  background: linear-gradient(to bottom, rgba(26, 23, 20, 0.3), rgba(26, 23, 20, 0.5));
  z-index: 1;
  width: 100%;
}

/* Add textile-inspired overlay pattern */
.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/images/textile-pattern.png');
  background-repeat: repeat;
  opacity: 0.1;
  z-index: 2;
  width: 100%;
  height: 100%;
  mix-blend-mode: overlay;
}

.artist-name {
  font-size: 4.5rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  letter-spacing: 3px;
  color: white;
  position: relative;
  z-index: 3;
  text-align: center;
  width: 100%;
  padding: 0 1rem;
  font-family: 'Cormorant Garamond', serif;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 1.2s ease-out forwards;
}

.artist-title {
  font-size: 1.8rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 2px;
  position: relative;
  z-index: 3;
  text-align: center;
  width: 100%;
  padding: 0 1rem;
  font-family: 'Raleway', sans-serif;
  text-transform: uppercase;
  animation: fadeInUp 1.2s 0.3s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.featured-works {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  padding: 5rem 2rem;
  background-color: #1a1714;
}

.work-preview {
  height: 500px;
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.work-preview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}

.work-preview::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 3;
  pointer-events: none;
}

.work-preview:hover {
  transform: translateY(-8px);
}

.work-preview:hover::before {
  transform: scale(1.05);
}

.funguy::before {
  background-image: url('/images/funguy-full.jpg');
}

.rainbow::before {
  background-image: url('/images/rainbow-full.jpg');
}

.atgazend::before {
  background-image: url('/images/atgazene.JPG');
}

.work-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2.5rem;
  background: linear-gradient(
    to top,
    rgba(26, 23, 20, 0.95),
    rgba(26, 23, 20, 0.8) 100%,
    rgba(26, 23, 20, 0)
  );
  color: white;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateY(0);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.work-preview:hover .work-info {
  padding-bottom: 3rem;
}

.work-info::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(199, 140, 96, 0.3), transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s ease;
}

.work-preview:hover .work-info::before {
  transform: scaleX(1);
}

.title-container {
  width: 100%;
  margin-bottom: 0.5rem;
}

.work-info h2 {
  font-size: 2.2rem;
  margin-bottom: 0;
  font-weight: 300;
  font-family: 'Cormorant Garamond', serif;
  position: relative;
  display: inline-block;
  transition: transform 0.4s ease;
  transform-origin: left bottom;
  letter-spacing: 1px;
}

.work-preview:hover .work-info h2 {
  transform: scale(1.05);
}

.work-info h2::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 30px;
  height: 1px;
  background-color: var(--accent-clay, #c78c60);
  transition: width 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.work-preview:hover .work-info h2::after {
  width: 100%;
}

.view-more {
  display: inline-block;
  color: rgba(199, 140, 96, 0.85);
  text-decoration: none;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  position: relative;
  font-family: 'Raleway', sans-serif;
  transition: all 0.3s ease;
  opacity: 1;
  transform: translateY(0);
  padding-right: 30px;
  letter-spacing: 0.5px;
  align-self: flex-start;
  clear: both;
}

.work-preview:hover .view-more {
  transform: translateY(0) scale(1.05);
  color: var(--accent-clay, #c78c60);
}

.view-more::before {
  display: none;
}

.work-preview:hover .view-more::before {
  display: none;
}

.view-more::after {
  content: '→';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
}

.work-preview:hover .view-more::after {
  transform: translate(5px, -50%);
}

/* Responsive styles */
@media (max-width: 768px) {
  .featured-works {
    grid-template-columns: 1fr;
    padding: 3rem 1.5rem;
  }

  .work-preview {
    height: 400px;
  }

  .artist-name {
    font-size: 3.5rem;
    letter-spacing: 2px;
  }

  .artist-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .artist-name {
    font-size: 2.5rem;
    letter-spacing: 1px;
  }

  .artist-title {
    font-size: 1.2rem;
    letter-spacing: 1px;
  }

  .work-preview {
    height: 350px;
  }

  .work-info h2 {
    font-size: 1.7rem;
  }
}
</style>
