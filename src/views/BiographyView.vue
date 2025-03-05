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
  padding: 2rem 2rem;
}

section {
  margin-bottom: 2rem;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

section h2 {
  font-size: 1.75rem;
  font-weight: 300;
  margin-bottom: 1rem;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.5rem;
}

section p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
}

.formatted-content {
  white-space: pre-line;
}

.exhibition-content {
  border-left: 4px solid #000;
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
  left: 0;
  top: 0;
  height: 100%;
  width: 2px;
  background-color: #000;
}

.timeline-item {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.timeline-dot {
  position: absolute;
  left: -4px;
  top: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #000;
}

.timeline-content {
  background-color: #f8f8f8;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.timeline-year {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #000;
}

.timeline-details {
  color: #444;
  line-height: 1.4;
  font-size: 0.95rem;
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

  .timeline::before {
    left: 12px;
  }

  .timeline-item {
    padding-left: 2rem;
  }

  .timeline-dot {
    left: 8px;
  }
}
</style>
