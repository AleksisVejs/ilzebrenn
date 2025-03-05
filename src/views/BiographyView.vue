<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="biography">
    <div class="bio-header">
      <div class="header-content">
        <h1>{{ t('biography.title') }}</h1>
        <div class="artist-image"></div>
        <p class="bio-intro">{{ t('biography.intro') }}</p>
      </div>
    </div>

    <div class="bio-content">
      <section class="background-section">
        <h2>{{ t('biography.background.title') }}</h2>
        <p>{{ t('biography.background.content') }}</p>
      </section>

      <section class="exhibitions-section">
        <h2>{{ t('biography.exhibitions.title') }}</h2>
        <div class="exhibition-content">
          <p>{{ t('biography.exhibitions.content') }}</p>
        </div>
      </section>

      <section class="workshops-section">
        <h2>{{ t('biography.workshops.title') }}</h2>
        <p>{{ t('biography.workshops.content') }}</p>
      </section>

      <section class="current-section">
        <h2>{{ t('biography.current.title') }}</h2>
        <p>{{ t('biography.current.content') }}</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.biography {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.bio-header {
  background-color: #000;
  color: white;
  padding: 120px 2rem 4rem;
}

.header-content {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.bio-header h1 {
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 2rem;
}

.artist-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto 2rem;
  background-image: url('/images/artist-portrait.jpg');
  background-size: cover;
  background-position: center;
}

.bio-intro {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
}

.bio-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

section {
  margin-bottom: 4rem;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

section h2 {
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.5rem;
}

section p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
}

.exhibition-content {
  border-left: 4px solid #000;
  padding-left: 1.5rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .bio-header h1 {
    font-size: 2rem;
  }

  .bio-intro {
    font-size: 1.1rem;
  }

  section h2 {
    font-size: 1.5rem;
  }
}
</style>
