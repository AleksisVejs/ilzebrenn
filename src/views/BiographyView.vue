<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const timeline = [
  {
    year: '2023',
    title: 'Solo Exhibition "Nature\'s Whispers"',
    location: 'Contemporary Art Museum, Riga',
  },
  {
    year: '2022',
    title: 'Artist Residency',
    location: "Nordic Artists' Centre, Dale, Norway",
  },
  {
    year: '2021',
    title: 'Group Exhibition "Textile Innovations"',
    location: 'Design Museum, Copenhagen',
  },
  // Add more timeline events
]

const achievements = [
  {
    title: 'Young Artist Award',
    year: '2023',
    organization: 'Latvia Arts Foundation',
  },
  {
    title: 'Environmental Art Grant',
    year: '2022',
    organization: 'Nordic Culture Fund',
  },
  // Add more achievements
]
</script>

<template>
  <div class="biography">
    <div class="bio-header">
      <div class="header-content">
        <h1>{{ t('nav.biography') }}</h1>
        <div class="artist-image"></div>
        <p class="bio-intro">{{ t('biography.intro') }}</p>
      </div>
    </div>

    <div class="bio-content">
      <section class="timeline-section">
        <h2>{{ t('biography.timeline') }}</h2>
        <div class="timeline">
          <div v-for="event in timeline" :key="event.year" class="timeline-item">
            <div class="year">{{ event.year }}</div>
            <div class="event-content">
              <h3>{{ event.title }}</h3>
              <p>{{ event.location }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="achievements-section">
        <h2>{{ t('biography.achievements') }}</h2>
        <div class="achievements-grid">
          <div
            v-for="achievement in achievements"
            :key="achievement.title"
            class="achievement-card"
          >
            <span class="year">{{ achievement.year }}</span>
            <h3>{{ achievement.title }}</h3>
            <p>{{ achievement.organization }}</p>
          </div>
        </div>
      </section>

      <section class="contact-section">
        <h2>{{ t('biography.contact') }}</h2>
        <div class="contact-info">
          <a href="mailto:contact@ilzebrenn.com" class="contact-link"> contact@ilzebrenn.com </a>
          <div class="social-links">
            <a href="#" target="_blank" rel="noopener">Instagram</a>
            <a href="#" target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </div>
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
}

section h2 {
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 2rem;
  color: #333;
}

.timeline {
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #ddd;
}

.timeline-item {
  display: flex;
  margin-bottom: 2rem;
  padding-left: 2rem;
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -4px;
  top: 8px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #000;
}

.year {
  font-size: 1.2rem;
  font-weight: 500;
  color: #000;
  margin-right: 2rem;
  min-width: 80px;
}

.event-content h3 {
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #333;
}

.event-content p {
  color: #666;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.achievement-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.achievement-card:hover {
  transform: translateY(-5px);
}

.achievement-card .year {
  display: inline-block;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.achievement-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.achievement-card p {
  color: #666;
}

.contact-section {
  text-align: center;
}

.contact-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.contact-link {
  font-size: 1.5rem;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #000;
}

.social-links {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}

.social-links a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: #000;
}

@media (max-width: 768px) {
  .bio-header {
    padding: 100px 1rem 3rem;
  }

  .bio-header h1 {
    font-size: 2.5rem;
  }

  .artist-image {
    width: 150px;
    height: 150px;
  }

  .bio-intro {
    font-size: 1.1rem;
  }

  .bio-content {
    padding: 2rem 1rem;
  }

  .timeline-item {
    flex-direction: column;
  }

  .year {
    margin-bottom: 0.5rem;
  }

  .achievements-grid {
    grid-template-columns: 1fr;
  }
}
</style>
