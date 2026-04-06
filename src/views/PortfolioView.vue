<script setup>
import { useI18n } from 'vue-i18n'
import { ref, computed, onMounted, onUnmounted, watch, reactive } from 'vue'

const { t } = useI18n()

const imagePath = (path) => {
  const cleanPath = path.startsWith('/') ? path.substring(1) : path
  return window.location.origin + '/' + cleanPath
}

const getWorks = () => [
  {
    id: 'funguy',
    title: t('portfolio.works.funguy.title'),
    description: t('portfolio.works.funguy.description'),
    year: '2023',
    material: t('portfolio.works.funguy.material'),
    dimensions: '150x30x30cm',
    images: [
      { url: imagePath('images/funguy-full.jpg'), alt: 'Fun-guy installation full view' },
      { url: imagePath('images/funguy1.jpg'), alt: 'Fun-guy installation detail 1' },
      { url: imagePath('images/funguy4.jpg'), alt: 'Fun-guy installation detail 2' },
    ],
    thumbnailIndex: 0,
    category: t('portfolio.works.funguy.category'),
  },
  {
    id: 'rainbow',
    title: t('portfolio.works.rainbow.title'),
    description: t('portfolio.works.rainbow.description'),
    year: t('portfolio.works.rainbow.year'),
    material: t('portfolio.works.rainbow.material'),
    dimensions: '200x150cm',
    images: [
      { url: imagePath('images/varaviksnene1.jpg'), alt: 'Varavīksnene view 1' },
      { url: imagePath('images/varaviksnene2.jpg'), alt: 'Varavīksnene view 2' },
      { url: imagePath('images/varaviksnene3.jpg'), alt: 'Varavīksnene view 3' },
      { url: imagePath('images/varaviksnene4.jpg'), alt: 'Varavīksnene view 4' },
      { url: imagePath('images/varaviksnene5.jpg'), alt: 'Varavīksnene view 5' },
      { url: imagePath('images/varaviksnene6.jpg'), alt: 'Varavīksnene view 6' },
      { url: imagePath('images/varaviksnene7.jpg'), alt: 'Varavīksnene view 7' },
      { url: imagePath('images/varaviksnene8.jpg'), alt: 'Varavīksnene view 8' },
    ],
    thumbnailIndex: 0,
    category: t('portfolio.works.rainbow.category'),
  },
  {
    id: 'atgazend',
    title: t('portfolio.works.atgazend.title'),
    description: t('portfolio.works.atgazend.description'),
    year: '2024',
    material: t('portfolio.works.atgazend.material'),
    dimensions: t('portfolio.works.atgazend.dimensions'),
    images: [
      { url: imagePath('images/atgazene.JPG'), alt: 'Atgazend installation main view' },
      { url: imagePath('images/atgazene1.jpg'), alt: 'Atgazend installation detail 1' },
      { url: imagePath('images/atgazene2.jpg'), alt: 'Atgazend installation detail 2' },
      { url: imagePath('images/atgazene3.jpg'), alt: 'Atgazend installation detail 3' },
      { url: imagePath('images/atgazene4.jpg'), alt: 'Atgazend installation detail 4' },
      { url: imagePath('images/atgazene5.jpg'), alt: 'Atgazend installation detail 5' },
      { url: imagePath('images/atgazene6.JPG'), alt: 'Atgazend installation detail 6' },
    ],
    thumbnailIndex: 0,
    category: t('portfolio.works.atgazend.category'),
  },
]

const works = computed(() => getWorks())
const selectedWork = ref(null)
const currentImageIndex = ref(0)
const imagesLoaded = ref({})
const touchStartX = ref(0)
const touchEndX = ref(0)
const savedScrollY = ref(0)
const visibleItems = reactive({})
const itemRefs = ref({})

let itemObserver = null

const setItemRef = (el, id) => {
  if (!el) {
    delete itemRefs.value[id]
    return
  }
  itemRefs.value[id] = el
}

const preloadWorkImages = (work) => {
  work.images.slice(0, 2).forEach((image) => {
    if (!imagesLoaded.value[image.url]) {
      const img = new Image()
      img.src = image.url
      img.onload = () => {
        imagesLoaded.value[image.url] = true
      }
    }
  })
}

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].clientX
  const minSwipeDistance = 50
  const swipeDistance = touchEndX.value - touchStartX.value
  if (Math.abs(swipeDistance) >= minSwipeDistance && selectedWork.value) {
    if (swipeDistance > 0) {
      prevImage()
    } else {
      nextImage()
    }
  }
}

onMounted(() => {
  works.value.forEach((work) => {
    const img = new Image()
    img.src = work.images[work.thumbnailIndex].url
    img.onload = () => {
      imagesLoaded.value[work.images[work.thumbnailIndex].url] = true
    }
  })

  itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.id
          if (id) visibleItems[id] = true
          itemObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  Object.values(itemRefs.value).forEach((el) => itemObserver.observe(el))
})

watch(selectedWork, (newWork) => {
  if (newWork) {
    preloadWorkImages(newWork)
  }
})

const openWork = (work) => {
  if (window.location.pathname.includes('/?') || window.location.search) {
    const cleanPath = window.location.pathname.split('/?')[0]
    window.history.replaceState(null, null, cleanPath)
  }
  selectedWork.value = work
  currentImageIndex.value = 0
  savedScrollY.value = window.scrollY
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.width = '100%'
  document.body.style.top = `-${savedScrollY.value}px`
}

const closeWork = () => {
  document.body.style.position = ''
  document.body.style.width = ''
  document.body.style.top = ''
  document.body.style.overflow = ''
  window.scrollTo(0, savedScrollY.value)
  selectedWork.value = null
  currentImageIndex.value = 0
}

const nextImage = () => {
  if (selectedWork.value) {
    currentImageIndex.value = (currentImageIndex.value + 1) % selectedWork.value.images.length
  }
}

const prevImage = () => {
  if (selectedWork.value) {
    currentImageIndex.value =
      currentImageIndex.value === 0
        ? selectedWork.value.images.length - 1
        : currentImageIndex.value - 1
  }
}

const handleKeydown = (e) => {
  if (!selectedWork.value) return
  switch (e.key) {
    case 'Escape':
      closeWork()
      break
    case 'ArrowLeft':
      prevImage()
      break
    case 'ArrowRight':
      nextImage()
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (itemObserver) itemObserver.disconnect()
  document.body.style.position = ''
  document.body.style.width = ''
  document.body.style.top = ''
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="portfolio">
    <div class="portfolio-header">
      <span class="header-label">{{ t('portfolio.installations') }}</span>
      <h1>{{ t('portfolio.title') }}</h1>
      <p class="portfolio-intro">{{ t('portfolio.intro') }}</p>
    </div>

    <div class="works-grid">
      <article
        v-for="(work, index) in works"
        :key="work.id"
        class="work-item"
        :class="{ visible: visibleItems[work.id] }"
        :data-id="work.id"
        :ref="(el) => setItemRef(el, work.id)"
        :style="{ transitionDelay: `${index * 0.12}s` }"
        role="button"
        :tabindex="0"
        :aria-label="work.title + ' — ' + work.year"
        @click="openWork(work)"
        @keydown.enter="openWork(work)"
        @keydown.space.prevent="openWork(work)"
      >
        <div class="work-item__image-wrap">
          <div
            class="work-item__image"
            :style="{ backgroundImage: 'url(' + work.images[work.thumbnailIndex].url + ')' }"
          ></div>
        </div>
        <div class="work-item__overlay"></div>
        <div class="work-item__content">
          <span class="work-item__category">{{ work.category }}</span>
          <h2 class="work-item__title">{{ work.title }}</h2>
          <div class="work-item__meta">
            <span>{{ work.year }}</span>
            <span class="meta-dot"></span>
            <span>{{ work.material }}</span>
          </div>
        </div>
        <div class="work-item__border"></div>
      </article>
    </div>

    <Transition name="modal">
      <div
        v-if="selectedWork"
        class="work-modal"
        role="dialog"
        :aria-label="selectedWork.title"
        aria-modal="true"
        @click.self="closeWork"
      >
        <button class="close-button" @click="closeWork" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div class="modal-content">
          <div
            class="modal-image-container"
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
          >
            <div
              class="modal-image"
              role="img"
              :aria-label="selectedWork.images[currentImageIndex].alt"
              :style="{ backgroundImage: 'url(' + selectedWork.images[currentImageIndex].url + ')' }"
            ></div>

            <button
              v-if="selectedWork.images.length > 1"
              class="nav-button prev"
              @click.stop="prevImage"
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              v-if="selectedWork.images.length > 1"
              class="nav-button next"
              @click.stop="nextImage"
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div
              v-if="selectedWork.images.length > 1"
              class="image-counter"
            >
              {{ currentImageIndex + 1 }} / {{ selectedWork.images.length }}
            </div>
          </div>

          <div class="modal-info">
            <div class="modal-info__head">
              <span class="modal-info__category">{{ selectedWork.category }}</span>
              <h2>{{ selectedWork.title }}</h2>
            </div>
            <div class="work-details">
              <div class="detail-item">
                <span class="detail-label">{{ t('portfolio.details.year') }}</span>
                <span class="detail-value">{{ selectedWork.year }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">{{ t('portfolio.details.material') }}</span>
                <span class="detail-value">{{ selectedWork.material }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">{{ t('portfolio.details.dimensions') }}</span>
                <span class="detail-value">{{ selectedWork.dimensions }}</span>
              </div>
            </div>
            <div class="modal-info__divider"></div>
            <p class="work-description">{{ selectedWork.description }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.portfolio {
  min-height: 100vh;
  padding: 0 0 6rem;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

/* ===== HEADER ===== */
.portfolio-header {
  max-width: 800px;
  margin: 0 auto;
  padding: 10rem 2rem 4rem;
  text-align: center;
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

.portfolio-header h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 300;
  margin-bottom: 2rem;
  letter-spacing: 1px;
  font-family: var(--font-heading);
}

.portfolio-intro {
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.9;
  font-family: var(--font-body);
  font-weight: 300;
  color: var(--text-muted);
}

/* ===== WORKS GRID ===== */
.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.work-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 3 / 4;
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}

.work-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.work-item:focus-visible {
  outline: 2px solid var(--accent-clay);
  outline-offset: 2px;
}

.work-item__image-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.work-item__image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.work-item:hover .work-item__image {
  transform: scale(1.05);
}

.work-item__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 40%,
    rgba(26, 23, 20, 0.4) 65%,
    rgba(26, 23, 20, 0.92) 100%
  );
  z-index: 1;
}

.work-item__overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 30%,
    rgba(26, 23, 20, 0.35) 55%,
    rgba(26, 23, 20, 0.88) 100%
  );
  opacity: 0;
  transition: opacity 0.5s ease;
}

.work-item:hover .work-item__overlay::after {
  opacity: 1;
}

.work-item__content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 2.5rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transform: translateY(0);
  transition: transform var(--transition-bounce);
}

.work-item:hover .work-item__content {
  transform: translateY(-6px);
}

.work-item__category {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent-clay);
}

.work-item__title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 400;
  color: var(--text-primary);
  letter-spacing: 0.5px;
  line-height: 1.2;
}

.work-item__meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
}

.meta-dot {
  width: 3px;
  height: 3px;
  background-color: var(--accent-clay);
  opacity: 0.6;
  flex-shrink: 0;
}

.work-item__border {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 3;
  pointer-events: none;
}

/* ===== MODAL ===== */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.35s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.work-modal {
  position: fixed;
  inset: 0;
  background-color: rgba(10, 8, 6, 0.92);
  z-index: 1010;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.close-button {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: 1px solid var(--border-light);
  color: var(--text-muted);
  cursor: pointer;
  z-index: 1011;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-smooth);
}

.close-button:hover {
  color: var(--text-primary);
  border-color: var(--accent-clay);
}

.close-button:focus-visible {
  outline: 2px solid var(--accent-clay);
  outline-offset: 2px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  max-height: 90vh;
  width: 100%;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
}

.modal-image-container {
  width: 100%;
  height: 55vh;
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal-image {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 0.3s ease;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(26, 23, 20, 0.7);
  border: 1px solid var(--border-light);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  cursor: pointer;
  z-index: 1;
  transition: all var(--transition-smooth);
}

.nav-button.prev {
  left: 1rem;
}

.nav-button.next {
  right: 1rem;
}

.nav-button:hover {
  background: var(--accent-clay);
  color: var(--text-primary);
  border-color: var(--accent-clay);
}

.nav-button:focus-visible {
  outline: 2px solid var(--accent-clay);
  outline-offset: 2px;
}

.image-counter {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-body);
  font-size: 0.8rem;
  letter-spacing: 2px;
  color: var(--text-muted);
  background: rgba(26, 23, 20, 0.6);
  padding: 0.4rem 1rem;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.modal-info {
  padding: 2.5rem;
  overflow-y: auto;
  flex: 1;
}

.modal-info__head {
  margin-bottom: 2rem;
}

.modal-info__category {
  display: block;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent-clay);
  margin-bottom: 0.8rem;
}

.modal-info h2 {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 300;
  color: var(--text-primary);
  font-family: var(--font-heading);
  line-height: 1.2;
}

.work-details {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
  font-family: var(--font-body);
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.detail-label {
  font-size: 0.7rem;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.detail-value {
  font-size: 1rem;
  color: var(--text-secondary);
}

.modal-info__divider {
  width: 40px;
  height: 1px;
  background-color: var(--accent-clay);
  opacity: 0.4;
  margin: 2rem 0;
}

.work-description {
  font-size: 1.05rem;
  line-height: 1.85;
  color: var(--text-muted);
  font-family: var(--font-body);
  font-weight: 300;
  white-space: pre-line;
}

@media (min-width: 768px) {
  .modal-content {
    flex-direction: row;
    max-height: 85vh;
  }

  .modal-image-container {
    width: 58%;
    height: auto;
  }

  .modal-info {
    width: 42%;
  }
}

@media (max-width: 768px) {
  .works-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    padding: 0 1.5rem;
  }

  .portfolio-header {
    padding: 8rem 1.5rem 3rem;
  }

  .work-item__content {
    padding: 1.5rem 2rem;
  }

  .work-modal {
    padding: 0;
    align-items: stretch;
  }

  .modal-content {
    max-height: 100vh;
    max-width: 100%;
    overflow-y: auto;
    border: none;
  }

  .modal-image-container {
    height: auto;
    min-height: 50vh;
    aspect-ratio: 4 / 3;
  }

  .modal-image {
    background-size: cover;
    background-position: center;
  }

  .modal-info {
    padding: 2rem 1.5rem;
  }

  .close-button {
    background: rgba(26, 23, 20, 0.7);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }
}

@media (max-width: 480px) {
  .work-item__meta {
    flex-wrap: wrap;
  }

  .modal-image-container {
    min-height: 45vh;
  }

  .close-button {
    top: 0.8rem;
    right: 0.8rem;
    width: 38px;
    height: 38px;
  }

  .nav-button {
    width: 38px;
    height: 38px;
  }

  .modal-info {
    padding: 1.5rem;
  }

  .work-details {
    gap: 1.5rem;
  }

  .modal-info__divider {
    margin: 1.5rem 0;
  }

  .work-description {
    font-size: 0.95rem;
  }
}
</style>
