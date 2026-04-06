<script setup>
import { useI18n } from 'vue-i18n'
import { computed, ref, onMounted, onUnmounted } from 'vue'

const { t } = useI18n()
const activeSection = ref('')

const parseTimelineContent = (content) => {
  return content
    .split('\n')
    .map((line) => {
      const yearRangeWithPresentMatch = line.match(/^(\d{4}\s*[-–]\s*(present|šim brīdim))\s+(.+)/)
      const yearRangeMatch = line.match(/^(\d{4}\s*[-–]\s*\d{4})\s+(.+)/)
      const yearMatch = line.match(/^(\d{4})\s+(.+)/)

      if (yearRangeWithPresentMatch) {
        return { year: yearRangeWithPresentMatch[1], details: yearRangeWithPresentMatch[3] }
      } else if (yearRangeMatch) {
        return { year: yearRangeMatch[1], details: yearRangeMatch[2] }
      } else if (yearMatch) {
        return { year: yearMatch[1], details: yearMatch[2] }
      }
      return null
    })
    .filter((item) => item !== null)
}

const sections = computed(() => [
  { id: 'background', title: t('biography.background.title') },
  { id: 'exhibitions', title: t('biography.exhibitions.title') },
  { id: 'workshops', title: t('biography.workshops.title') },
  { id: 'education', title: t('biography.education.title') },
  { id: 'current', title: t('biography.current.title') },
])

const exhibitionItems = computed(() => parseTimelineContent(t('biography.exhibitions.content')))
const workshopItems = computed(() => parseTimelineContent(t('biography.workshops.content')))
const educationItems = computed(() => parseTimelineContent(t('biography.education.content')))

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const handleScrollSpy = () => {
  const sectionIds = sections.value.map((s) => s.id)
  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const el = document.getElementById(sectionIds[i])
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 200) {
        activeSection.value = sectionIds[i]
        return
      }
    }
  }
  activeSection.value = sectionIds[0] || ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScrollSpy, { passive: true })
  handleScrollSpy()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollSpy)
})
</script>

<template>
  <div class="biography">
    <div class="bio-header">
      <div class="header-content">
        <h1>{{ t('biography.title') }}</h1>
        <div class="artist-image" role="img" :aria-label="t('home.title')"></div>
        <p class="bio-intro">{{ t('biography.intro') }}</p>
      </div>
    </div>

    <nav class="section-nav" aria-label="Biography sections">
      <button
        v-for="section in sections"
        :key="section.id"
        :class="['section-nav-btn', { active: activeSection === section.id }]"
        @click="scrollToSection(section.id)"
      >
        {{ section.title }}
      </button>
    </nav>

    <div class="bio-content">
      <section id="background" class="background-section">
        <h2>{{ t('biography.background.title') }}</h2>
        <p>{{ t('biography.background.content') }}</p>
      </section>

      <section id="exhibitions" class="exhibitions-section">
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

      <section id="workshops" class="workshops-section">
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

      <section id="education" class="education-section">
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

      <section id="current" class="current-section">
        <h2>{{ t('biography.current.title') }}</h2>
        <p>{{ t('biography.current.content') }}</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.biography {
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.bio-header {
  background-color: var(--bg-primary);
  color: var(--text-primary);
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
  font-family: var(--font-heading);
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
  background-color: var(--accent-clay);
}

.artist-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto 2rem;
  background-image: url('/images/artist-portrait.jpg');
  background-size: cover;
  background-position: center;
  border: 3px solid var(--border-light);
}

.bio-intro {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-secondary);
  font-family: var(--font-body);
  font-weight: 300;
}

.section-nav {
  position: sticky;
  top: 70px;
  z-index: 100;
  background-color: rgba(26, 23, 20, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 1rem 2rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--border-subtle);
  max-width: 100%;
  overflow-x: auto;
}

.section-nav-btn {
  background: transparent;
  border: 1px solid var(--border-medium);
  color: var(--text-muted);
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all var(--transition-smooth);
  white-space: nowrap;
  letter-spacing: 0.5px;
}

.section-nav-btn:hover {
  border-color: var(--accent-clay);
  color: var(--accent-clay);
}

.section-nav-btn.active {
  border-color: var(--accent-clay);
  color: var(--accent-clay);
  background-color: var(--accent-clay-light);
}

.section-nav-btn:focus-visible {
  outline: 2px solid var(--accent-clay);
  outline-offset: 2px;
}

.bio-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

section {
  margin-bottom: 2rem;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 3px;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--border-subtle);
  scroll-margin-top: 140px;
}

section h2 {
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 0.8rem;
  font-family: var(--font-heading);
}

section p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  font-family: var(--font-body);
  font-weight: 300;
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
  background-color: var(--accent-clay);
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
  background-color: var(--accent-clay);
  border-radius: 0;
  transform: rotate(45deg);
}

.timeline-year {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
  color: var(--accent-clay);
  font-family: var(--font-body);
}

.timeline-details {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  font-family: var(--font-body);
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

  .section-nav {
    gap: 0.4rem;
    padding: 0.75rem 1rem;
    justify-content: flex-start;
  }

  .section-nav-btn {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
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
