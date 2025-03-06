<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const parseTimelineContent = (content) => {
  return content
    .split('\n')
    .map((line) => {
      // Handle both regular hyphen and en dash, and both languages for "present"
      const yearRangeWithPresentMatch = line.match(/^(\d{4}\s*[-–]\s*(present|šim brīdim))\s+(.+)/)
      const yearRangeMatch = line.match(/^(\d{4}\s*[-–]\s*\d{4})\s+(.+)/)
      const yearMatch = line.match(/^(\d{4})\s+(.+)/)

      if (yearRangeWithPresentMatch) {
        return {
          year: yearRangeWithPresentMatch[1],
          details: yearRangeWithPresentMatch[3],
        }
      } else if (yearRangeMatch) {
        return {
          year: yearRangeMatch[1],
          details: yearRangeMatch[2],
        }
      } else if (yearMatch) {
        return {
          year: yearMatch[1],
          details: yearMatch[2],
        }
      }
      return null
    })
    .filter((item) => item !== null)
}

const exhibitionItems = computed(() => {
  return parseTimelineContent(t('biography.exhibitions.content'))
})

const workshopItems = computed(() => {
  return parseTimelineContent(t('biography.workshops.content'))
})

const educationItems = computed(() => {
  return parseTimelineContent(t('biography.education.content'))
})
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
        <div class="timeline">
          <div v-for="(item, index) in exhibitionItems" :key="index" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-year">{{ item.year }}</div>
              <div class="timeline-details">{{ item.details }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="workshops-section">
        <h2>{{ t('biography.workshops.title') }}</h2>
        <div class="timeline">
          <div v-for="(item, index) in workshopItems" :key="index" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-year">{{ item.year }}</div>
              <div class="timeline-details">{{ item.details }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="education-section">
        <h2>{{ t('biography.education.title') }}</h2>
        <div class="timeline">
          <div v-for="(item, index) in educationItems" :key="index" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-year">{{ item.year }}</div>
              <div class="timeline-details">{{ item.details }}</div>
            </div>
          </div>
        </div>
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
  background-color: #1a1714;
  color: white;
}

.bio-header {
  background-color: #1a1714;
  color: white;
  padding: 120px 2rem 4rem;
}

.header-content {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.bio-header h1 {
  font-size: 3.5rem;
  font-weight: 300;
  margin-bottom: 2.5rem;
  font-family: 'Cormorant Garamond', serif;
  position: relative;
  display: inline-block;
}

.bio-header h1::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--accent-clay, #c78c60);
}

.artist-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto 2rem;
  background-image: url('/images/artist-portrait.jpg');
  background-size: cover;
  background-position: center;
  border: 3px solid rgba(255, 255, 255, 0.1);
}

.bio-intro {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
}

.bio-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 2rem;
}

section {
  margin-bottom: 2rem;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 3px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

section h2 {
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.8rem;
  font-family: 'Cormorant Garamond', serif;
}

section p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
}

.formatted-content {
  white-space: pre-line;
}

.exhibition-content {
  border-left: 3px solid var(--accent-clay, #c78c60);
  padding-left: 1.5rem;
  margin-top: 1rem;
}

.timeline {
  position: relative;
  padding: 1rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  background-color: var(--accent-clay, #c78c60);
  opacity: 0.6;
}

.timeline-item {
  position: relative;
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.timeline-dot {
  position: absolute;
  left: -4px;
  top: 5px;
  width: 10px;
  height: 10px;
  background-color: var(--accent-clay, #c78c60);
  border-radius: 0;
  transform: rotate(45deg);
}

.timeline-year {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
  color: var(--accent-clay, #c78c60);
  font-family: 'Raleway', sans-serif;
}

.timeline-details {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Raleway', sans-serif;
}

@media (max-width: 768px) {
  .bio-header h1 {
    font-size: 2.8rem;
  }

  .bio-intro {
    font-size: 1.1rem;
  }

  .bio-content {
    padding: 2rem 1rem;
  }
}

@media (max-width: 480px) {
  .bio-header h1 {
    font-size: 2.2rem;
  }

  .artist-image {
    width: 150px;
    height: 150px;
  }

  .bio-intro {
    font-size: 1rem;
  }

  section h2 {
    font-size: 1.5rem;
  }

  section p {
    font-size: 1rem;
  }
}
</style>
