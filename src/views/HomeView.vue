<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const works = [
  {
    id: 'funguy',
    titleKey: 'portfolio.works.funguy.title',
    categoryKey: 'portfolio.works.funguy.category',
    imageUrl: '/images/funguy-full.jpg',
  },
  {
    id: 'rainbow',
    titleKey: 'portfolio.works.rainbow.title',
    categoryKey: 'portfolio.works.rainbow.category',
    imageUrl: '/images/varaviksnene1.jpg',
  },
  {
    id: 'atgazend',
    titleKey: 'portfolio.works.atgazend.title',
    categoryKey: 'portfolio.works.atgazend.category',
    imageUrl: '/images/atgazene.JPG',
  },
]

const heroLoaded = ref(false)
const parallaxY = ref(0)
const revealedSections = reactive({})
const visibleWorks = reactive({})

let sectionObserver = null
let workObserver = null

const sectionRefs = ref({})
const workRefs = ref({})

const setSectionRef = (el, id) => {
  if (!el) {
    delete sectionRefs.value[id]
    return
  }
  sectionRefs.value[id] = el
}

const setWorkRef = (el, id) => {
  if (!el) {
    delete workRefs.value[id]
    return
  }
  workRefs.value[id] = el
}

let parallaxTicking = false
const handleParallax = () => {
  if (parallaxTicking) return
  parallaxTicking = true
  requestAnimationFrame(() => {
    const scrollY = window.scrollY
    if (scrollY < window.innerHeight) {
      parallaxY.value = scrollY * 0.35
    }
    parallaxTicking = false
  })
}

const navigateToPortfolio = () => {
  router.push('/portfolio')
}

const navigateToContact = () => {
  router.push('/contact')
}

const scrollToContent = () => {
  const statement = sectionRefs.value['statement']
  if (statement) {
    statement.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  requestAnimationFrame(() => {
    heroLoaded.value = true
  })

  window.addEventListener('scroll', handleParallax, { passive: true })

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.section
          if (id) revealedSections[id] = true
          sectionObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 },
  )

  workObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.id
          if (id) visibleWorks[id] = true
          workObserver.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '100px 0px' },
  )

  Object.values(sectionRefs.value).forEach((el) => sectionObserver.observe(el))
  Object.values(workRefs.value).forEach((el) => workObserver.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleParallax)
  if (sectionObserver) sectionObserver.disconnect()
  if (workObserver) workObserver.disconnect()
})
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero" :class="{ loaded: heroLoaded }">
      <div class="hero-bg" :style="{ transform: `translateY(${parallaxY}px)` }"></div>
      <div class="hero-overlay"></div>

      <div class="hero-decor-left">
        <svg viewBox="0 0 2 120" xmlns="http://www.w3.org/2000/svg">
          <line x1="1" y1="0" x2="1" y2="120" stroke="currentColor" stroke-width="0.5" />
        </svg>
      </div>
      <div class="hero-decor-right">
        <svg viewBox="0 0 2 120" xmlns="http://www.w3.org/2000/svg">
          <line x1="1" y1="0" x2="1" y2="120" stroke="currentColor" stroke-width="0.5" />
        </svg>
      </div>

      <div class="hero-content">
        <p class="hero-accent-line">--</p>
        <h1 class="hero-title">{{ t('home.title') }}</h1>
        <p class="hero-subtitle">{{ t('home.subtitle') }}</p>
      </div>

      <button class="scroll-hint" @click="scrollToContent" :aria-label="t('home.scroll_hint')">
        <span class="scroll-hint-text">{{ t('home.scroll_hint') }}</span>
        <span class="scroll-hint-line"></span>
      </button>
    </section>

    <!-- Artist Statement -->
    <section
      class="statement"
      data-section="statement"
      :ref="(el) => setSectionRef(el, 'statement')"
      :class="{ revealed: revealedSections['statement'] }"
    >
      <div class="statement-inner">
        <div class="statement-decor">
          <span></span><span></span><span></span>
        </div>
        <h2 class="statement-heading">{{ t('home.statement_heading') }}</h2>
        <p class="statement-body">{{ t('home.statement_body') }}</p>
        <div class="statement-decor bottom">
          <span></span><span></span><span></span>
        </div>
      </div>
    </section>

    <!-- Featured Works -->
    <section
      class="featured"
      data-section="featured"
      :ref="(el) => setSectionRef(el, 'featured')"
      :class="{ revealed: revealedSections['featured'] }"
    >
      <div class="featured-header">
        <span class="featured-label">{{ t('home.featured_subheading') }}</span>
        <h2 class="featured-title">{{ t('home.featured_heading') }}</h2>
      </div>

      <div class="works-grid">
        <article
          v-for="(work, index) in works"
          :key="work.id"
          class="work-card"
          :class="[`work-card--${index}`, { visible: visibleWorks[work.id] }]"
          :data-id="work.id"
          :ref="(el) => setWorkRef(el, work.id)"
          role="button"
          :tabindex="0"
          :aria-label="t(work.titleKey) + ' — ' + t('nav.portfolio')"
          @click="navigateToPortfolio"
          @keydown.enter="navigateToPortfolio"
          @keydown.space.prevent="navigateToPortfolio"
        >
          <div class="work-card__image-wrap">
            <div
              class="work-card__image"
              :style="{
                backgroundImage: visibleWorks[work.id] ? `url(${work.imageUrl})` : 'none',
              }"
            ></div>
          </div>
          <div class="work-card__overlay"></div>
          <div class="work-card__content">
            <span class="work-card__category">{{ t(work.categoryKey) }}</span>
            <h3 class="work-card__title">{{ t(work.titleKey) }}</h3>
            <span class="work-card__link">
              {{ t('nav.portfolio') }}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
          <div class="work-card__border"></div>
        </article>
      </div>
    </section>

    <!-- CTA -->
    <section
      class="cta"
      data-section="cta"
      :ref="(el) => setSectionRef(el, 'cta')"
      :class="{ revealed: revealedSections['cta'] }"
    >
      <div class="cta-inner">
        <h2 class="cta-heading">{{ t('home.cta_heading') }}</h2>
        <p class="cta-body">{{ t('home.cta_body') }}</p>
        <div class="cta-actions">
          <button class="cta-btn cta-btn--primary" @click="navigateToPortfolio">
            {{ t('home.cta_portfolio') }}
          </button>
          <button class="cta-btn cta-btn--secondary" @click="navigateToContact">
            {{ t('home.cta_contact') }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== HERO ===== */
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: -15% 0 0 0;
  background-image: url('/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  will-change: transform;
  transition: opacity 1.6s ease;
  opacity: 0;
}

.hero.loaded .hero-bg {
  opacity: 1;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(26, 23, 20, 0.25) 0%,
    rgba(26, 23, 20, 0.15) 40%,
    rgba(26, 23, 20, 0.4) 80%,
    rgba(26, 23, 20, 0.85) 100%
  );
  z-index: 1;
}

.hero-decor-left,
.hero-decor-right {
  position: absolute;
  top: 15%;
  height: 70%;
  z-index: 2;
  color: rgba(199, 140, 96, 0.15);
  opacity: 0;
  transition: opacity 1.8s ease 0.6s;
}

.hero.loaded .hero-decor-left,
.hero.loaded .hero-decor-right {
  opacity: 1;
}

.hero-decor-left {
  left: 3rem;
}

.hero-decor-right {
  right: 3rem;
}

.hero-decor-left svg,
.hero-decor-right svg {
  height: 100%;
  width: 2px;
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.hero-accent-line {
  font-family: var(--font-body);
  font-size: 1.4rem;
  letter-spacing: 12px;
  color: var(--accent-clay);
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.8s ease 0.3s,
    transform 0.8s ease 0.3s;
}

.hero.loaded .hero-accent-line {
  opacity: 0.8;
  transform: translateY(0);
}

.hero-title {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 300;
  color: var(--text-primary);
  letter-spacing: 4px;
  line-height: 1.1;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 1s ease 0.5s,
    transform 1s ease 0.5s;
}

.hero.loaded .hero-title {
  opacity: 1;
  transform: translateY(0);
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: 300;
  color: var(--text-secondary);
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-top: 0.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.8s ease 0.8s,
    transform 0.8s ease 0.8s;
}

.hero.loaded .hero-subtitle {
  opacity: 1;
  transform: translateY(0);
}

/* Scroll hint */
.scroll-hint {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 1s ease 1.4s;
}

.hero.loaded .scroll-hint {
  opacity: 1;
}

.scroll-hint-text {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color var(--transition-smooth);
}

.scroll-hint:hover .scroll-hint-text {
  color: var(--accent-clay);
}

.scroll-hint-line {
  display: block;
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--accent-clay), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%,
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
  50% {
    opacity: 0.4;
    transform: scaleY(0.6);
  }
}

/* ===== STATEMENT ===== */
.statement {
  padding: 8rem 2rem;
  display: flex;
  justify-content: center;
  background-color: var(--bg-primary);
  position: relative;
}

.statement-inner {
  max-width: 700px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity var(--transition-slow),
    transform var(--transition-slow);
}

.statement.revealed .statement-inner {
  opacity: 1;
  transform: translateY(0);
}

.statement-decor {
  display: flex;
  align-items: center;
  gap: 8px;
}

.statement-decor span {
  display: block;
  background-color: var(--accent-clay);
  border-radius: 50%;
}

.statement-decor span:nth-child(1),
.statement-decor span:nth-child(3) {
  width: 3px;
  height: 3px;
  opacity: 0.4;
}

.statement-decor span:nth-child(2) {
  width: 5px;
  height: 5px;
  opacity: 0.7;
}

.statement-decor.bottom {
  margin-top: 0.5rem;
}

.statement-heading {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 300;
  color: var(--text-primary);
  letter-spacing: 1px;
  line-height: 1.3;
}

.statement-body {
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.9;
  letter-spacing: 0.3px;
}

/* ===== FEATURED WORKS ===== */
.featured {
  padding: 4rem 2rem 8rem;
  background-color: var(--bg-primary);
  position: relative;
}

.featured-header {
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity var(--transition-slow),
    transform var(--transition-slow);
}

.featured.revealed .featured-header {
  opacity: 1;
  transform: translateY(0);
}

.featured-label {
  font-family: var(--font-body);
  font-size: 0.8rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent-clay);
  display: block;
  margin-bottom: 1rem;
}

.featured-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  color: var(--text-primary);
  letter-spacing: 1px;
}

.works-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* First card spans full left column, tall */
.work-card--0 {
  grid-row: 1 / 3;
}

/* Second and third stack on the right */
.work-card--1 {
  grid-row: 1;
  grid-column: 2;
}

.work-card--2 {
  grid-row: 2;
  grid-column: 2;
}

.work-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  min-height: 340px;
  opacity: 0;
  transform: translateY(50px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}

.work-card--0 {
  min-height: 700px;
}

.work-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.work-card.visible.work-card--1 {
  transition-delay: 0.15s;
}

.work-card.visible.work-card--2 {
  transition-delay: 0.3s;
}

.work-card__image-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.work-card__image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.work-card:hover .work-card__image {
  transform: scale(1.06);
}

.work-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 30%,
    rgba(26, 23, 20, 0.5) 70%,
    rgba(26, 23, 20, 0.9) 100%
  );
  z-index: 1;
}

.work-card__overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 20%,
    rgba(26, 23, 20, 0.4) 60%,
    rgba(26, 23, 20, 0.85) 100%
  );
  opacity: 0;
  transition: opacity var(--transition-cubic);
}

.work-card:hover .work-card__overlay::after {
  opacity: 1;
}

.work-card__content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 2.5rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transform: translateY(0);
  transition: transform var(--transition-bounce);
}

.work-card:hover .work-card__content {
  transform: translateY(-8px);
}

.work-card__category {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent-clay);
}

.work-card__title {
  font-family: var(--font-heading);
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 400;
  color: var(--text-primary);
  letter-spacing: 0.5px;
  line-height: 1.2;
}

.work-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-top: 0.3rem;
  transition: color var(--transition-smooth);
}

.work-card__link svg {
  transition: transform var(--transition-smooth);
}

.work-card:hover .work-card__link {
  color: var(--accent-clay);
}

.work-card:hover .work-card__link svg {
  transform: translateX(4px);
}

.work-card__border {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.06);
  z-index: 3;
  pointer-events: none;
}

.work-card:focus-visible {
  outline: 2px solid var(--accent-clay);
  outline-offset: 2px;
}

/* ===== CTA ===== */
.cta {
  padding: 8rem 2rem;
  display: flex;
  justify-content: center;
  background-color: var(--bg-warm);
  position: relative;
  overflow: hidden;
}

.cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--accent-clay), transparent);
}

.cta-inner {
  max-width: 600px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity var(--transition-slow),
    transform var(--transition-slow);
}

.cta.revealed .cta-inner {
  opacity: 1;
  transform: translateY(0);
}

.cta-heading {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 300;
  color: var(--text-primary);
  letter-spacing: 1px;
  line-height: 1.3;
}

.cta-body {
  font-family: var(--font-body);
  font-size: 1.05rem;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.8;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.cta-btn {
  font-family: var(--font-body);
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 1rem 2.2rem;
  cursor: pointer;
  transition:
    transform var(--transition-smooth),
    opacity var(--transition-smooth),
    color var(--transition-smooth),
    border-color var(--transition-smooth),
    background-color var(--transition-smooth);
}

.cta-btn--primary {
  background-color: var(--accent-clay);
  color: var(--bg-primary);
  border: 1px solid var(--accent-clay);
}

.cta-btn--primary:hover {
  background-color: var(--accent-clay-hover);
  transform: translateY(-2px);
}

.cta-btn--secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-medium);
}

.cta-btn--secondary:hover {
  border-color: var(--accent-clay);
  color: var(--accent-clay);
  transform: translateY(-2px);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .works-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .work-card--0 {
    grid-row: auto;
    min-height: 450px;
  }

  .work-card--1,
  .work-card--2 {
    grid-column: 1;
    grid-row: auto;
  }

  .work-card {
    min-height: 380px;
  }
}

@media (max-width: 768px) {
  .hero-decor-left,
  .hero-decor-right {
    display: none;
  }

  .statement {
    padding: 5rem 1.5rem;
  }

  .featured {
    padding: 3rem 1.5rem 5rem;
  }

  .cta {
    padding: 5rem 1.5rem;
  }

  .work-card--0 {
    min-height: 400px;
  }

  .work-card {
    min-height: 340px;
  }

  .work-card__content {
    padding: 1.5rem 2rem;
  }
}

@media (max-width: 480px) {
  .statement-heading {
    font-size: 1.8rem;
  }

  .statement-body {
    font-size: 1rem;
  }

  .work-card--0 {
    min-height: 350px;
  }

  .work-card {
    min-height: 300px;
  }

  .cta-actions {
    flex-direction: column;
    width: 100%;
  }

  .cta-btn {
    width: 100%;
  }
}
</style>
