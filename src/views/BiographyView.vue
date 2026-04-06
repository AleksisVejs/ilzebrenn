<script setup>
import { useI18n } from 'vue-i18n'
import { computed, ref, reactive, onMounted, onUnmounted } from 'vue'

const { t } = useI18n()
const revealedSections = reactive({})
const expandedSections = reactive({})
const sectionEls = ref({})

let revealObserver = null

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

const exhibitionItems = computed(() => parseTimelineContent(t('biography.exhibitions.content')))
const workshopItems = computed(() => parseTimelineContent(t('biography.workshops.content')))
const educationItems = computed(() => parseTimelineContent(t('biography.education.content')))

const toggleSection = (id) => {
  expandedSections[id] = !expandedSections[id]
}

const setSectionEl = (el, id) => {
  if (!el) {
    delete sectionEls.value[id]
    return
  }
  sectionEls.value[id] = el
}

onMounted(() => {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.reveal
          if (id) revealedSections[id] = true
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  Object.values(sectionEls.value).forEach((el) => revealObserver.observe(el))
})

onUnmounted(() => {
  if (revealObserver) revealObserver.disconnect()
})
</script>

<template>
  <div class="biography">
    <!-- Page Header -->
    <div class="bio-header">
      <div class="header-inner">
        <div class="header-text">
          <span class="header-label">{{ t('biography.title') }}</span>
          <h1>{{ t('home.title') }}</h1>
          <p class="bio-intro">{{ t('biography.intro') }}</p>
        </div>
        <div class="header-portrait">
          <div class="portrait-frame">
            <div class="portrait-image" role="img" :aria-label="t('home.title')"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="bio-content">
      <section
        id="background"
        data-reveal="background"
        :ref="(el) => setSectionEl(el, 'background')"
        :class="['content-section', { revealed: revealedSections['background'] }]"
      >
        <h2>{{ t('biography.background.title') }}</h2>
        <p class="section-text">{{ t('biography.background.content') }}</p>
      </section>

      <!-- Exhibitions (collapsible) -->
      <section
        id="exhibitions"
        data-reveal="exhibitions"
        :ref="(el) => setSectionEl(el, 'exhibitions')"
        :class="['content-section', 'collapsible-section', { revealed: revealedSections['exhibitions'] }]"
      >
        <button
          class="section-toggle"
          :class="{ expanded: expandedSections['exhibitions'] }"
          @click="toggleSection('exhibitions')"
          :aria-expanded="!!expandedSections['exhibitions']"
        >
          <h2>{{ t('biography.exhibitions.title') }}</h2>
          <div class="section-toggle__meta">
            <span class="section-toggle__count">{{ exhibitionItems.length }}</span>
            <svg class="section-toggle__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </button>
        <div class="collapsible-body" :class="{ open: expandedSections['exhibitions'] }">
          <div class="timeline">
            <div v-for="(item, index) in exhibitionItems" :key="index" class="timeline-row">
              <span class="timeline-year">{{ item.year }}</span>
              <span class="timeline-details">{{ item.details }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Workshops (collapsible) -->
      <section
        id="workshops"
        data-reveal="workshops"
        :ref="(el) => setSectionEl(el, 'workshops')"
        :class="['content-section', 'collapsible-section', { revealed: revealedSections['workshops'] }]"
      >
        <button
          class="section-toggle"
          :class="{ expanded: expandedSections['workshops'] }"
          @click="toggleSection('workshops')"
          :aria-expanded="!!expandedSections['workshops']"
        >
          <h2>{{ t('biography.workshops.title') }}</h2>
          <div class="section-toggle__meta">
            <span class="section-toggle__count">{{ workshopItems.length }}</span>
            <svg class="section-toggle__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </button>
        <div class="collapsible-body" :class="{ open: expandedSections['workshops'] }">
          <div class="timeline">
            <div v-for="(item, index) in workshopItems" :key="index" class="timeline-row">
              <span class="timeline-year">{{ item.year }}</span>
              <span class="timeline-details">{{ item.details }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Education (collapsible) -->
      <section
        id="education"
        data-reveal="education"
        :ref="(el) => setSectionEl(el, 'education')"
        :class="['content-section', 'collapsible-section', { revealed: revealedSections['education'] }]"
      >
        <button
          class="section-toggle"
          :class="{ expanded: expandedSections['education'] }"
          @click="toggleSection('education')"
          :aria-expanded="!!expandedSections['education']"
        >
          <h2>{{ t('biography.education.title') }}</h2>
          <div class="section-toggle__meta">
            <span class="section-toggle__count">{{ educationItems.length }}</span>
            <svg class="section-toggle__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </button>
        <div class="collapsible-body" :class="{ open: expandedSections['education'] }">
          <div class="timeline">
            <div v-for="(item, index) in educationItems" :key="index" class="timeline-row">
              <span class="timeline-year">{{ item.year }}</span>
              <span class="timeline-details">{{ item.details }}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="current"
        data-reveal="current"
        :ref="(el) => setSectionEl(el, 'current')"
        :class="['content-section', { revealed: revealedSections['current'] }]"
      >
        <h2>{{ t('biography.current.title') }}</h2>
        <p class="section-text">{{ t('biography.current.content') }}</p>
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

/* ===== HEADER ===== */
.bio-header {
  padding: 10rem 2rem 1.5rem;
}

.header-inner {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;
}

.header-text {
  flex: 1;
}

.header-label {
  display: block;
  font-family: var(--font-body);
  font-size: 0.8rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent-clay);
  margin-bottom: 1.2rem;
}

.bio-header h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 300;
  margin-bottom: 1rem;
  font-family: var(--font-heading);
  letter-spacing: 1px;
  line-height: 1.15;
}

.bio-intro {
  font-size: 1.1rem;
  line-height: 1.9;
  color: var(--text-muted);
  font-family: var(--font-body);
  font-weight: 300;
  max-width: 500px;
}

.header-portrait {
  flex-shrink: 0;
}

.portrait-frame {
  width: 260px;
  height: 320px;
  position: relative;
}

.portrait-frame::before {
  content: '';
  position: absolute;
  top: -8px;
  left: -8px;
  right: 8px;
  bottom: 8px;
  border: 1px solid var(--accent-clay);
  opacity: 0.3;
}

.portrait-image {
  width: 100%;
  height: 100%;
  background-image: url('/images/artist-portrait.jpg');
  background-size: cover;
  background-position: center;
}

/* ===== CONTENT ===== */
.bio-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem 2rem 6rem;
}

.content-section {
  margin-bottom: 3rem;
  scroll-margin-top: 80px;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}

.content-section.revealed {
  opacity: 1;
  transform: translateY(0);
}

.content-section > h2 {
  font-size: clamp(1.6rem, 3vw, 2rem);
  font-weight: 300;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  font-family: var(--font-heading);
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-subtle);
}

.section-text {
  font-size: 1.05rem;
  line-height: 1.85;
  color: var(--text-secondary);
  font-family: var(--font-body);
  font-weight: 300;
}

/* ===== COLLAPSIBLE SECTIONS ===== */
.section-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-subtle);
  transition: border-color var(--transition-smooth);
}

.section-toggle:hover {
  border-bottom-color: var(--accent-clay);
}

.section-toggle h2 {
  font-size: clamp(1.6rem, 3vw, 2rem);
  font-weight: 300;
  color: var(--text-primary);
  font-family: var(--font-heading);
  margin: 0;
  padding: 0;
  border: none;
  transition: color var(--transition-smooth);
  text-align: left;
}

.section-toggle:hover h2 {
  color: var(--accent-clay);
}

.section-toggle__meta {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-shrink: 0;
}

.section-toggle__count {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: var(--text-faint);
  border: 1px solid var(--border-light);
  padding: 0.2rem 0.6rem;
  min-width: 2rem;
  text-align: center;
}

.section-toggle__icon {
  color: var(--text-faint);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.section-toggle.expanded .section-toggle__icon {
  transform: rotate(180deg);
}

/* Collapsible body */
.collapsible-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.collapsible-body.open {
  grid-template-rows: 1fr;
}

.collapsible-body > .timeline {
  overflow: hidden;
}

/* ===== TIMELINE (compact) ===== */
.timeline {
  padding-top: 1.2rem;
}

.timeline-row {
  display: flex;
  align-items: baseline;
  gap: 1.2rem;
  padding: 0.55rem 0;
  border-bottom: 1px solid var(--border-subtle);
  transition: background-color var(--transition-smooth);
}

.timeline-row:last-child {
  border-bottom: none;
}

.timeline-row:hover {
  background-color: rgba(199, 140, 96, 0.03);
}

.timeline-year {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--accent-clay);
  font-family: var(--font-body);
  letter-spacing: 0.5px;
  flex-shrink: 0;
  min-width: 3rem;
  opacity: 0.85;
}

.timeline-details {
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--text-muted);
  font-family: var(--font-body);
  font-weight: 300;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .bio-header {
    padding: 7rem 1.5rem 1rem;
  }

  .header-inner {
    flex-direction: column-reverse;
    text-align: center;
    gap: 1.5rem;
  }

  .bio-intro {
    max-width: none;
  }

  .portrait-frame {
    width: 160px;
    height: 200px;
    margin: 0 auto;
  }

  .bio-content {
    padding: 1.2rem 1.5rem 4rem;
  }
}

@media (max-width: 480px) {
  .bio-header {
    padding: 6rem 1.5rem 0.8rem;
  }

  .header-inner {
    gap: 1.2rem;
  }

  .portrait-frame {
    width: 130px;
    height: 165px;
  }

  .portrait-frame::before {
    top: -5px;
    left: -5px;
    right: 5px;
    bottom: 5px;
  }

  .bio-intro {
    font-size: 1rem;
  }

  .timeline-row {
    flex-direction: column;
    gap: 0.15rem;
    padding: 0.6rem 0;
  }

  .content-section > h2,
  .section-toggle h2 {
    font-size: 1.5rem;
  }

  .section-toggle__count {
    font-size: 0.7rem;
  }
}
</style>
