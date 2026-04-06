<script setup>
import { useI18n } from 'vue-i18n'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

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

const preloadWorkImages = (work) => {
  work.images.forEach((image) => {
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

const goToImage = (index) => {
  currentImageIndex.value = index
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
  document.body.style.position = ''
  document.body.style.width = ''
  document.body.style.top = ''
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="portfolio">
    <div class="portfolio-header">
      <h1>{{ t('portfolio.title') }}</h1>
      <p class="portfolio-intro">{{ t('portfolio.intro') }}</p>
    </div>

    <div class="category-header installations-header">
      <h2>{{ t('portfolio.installations') || 'Installations' }}</h2>
    </div>

    <div class="works-grid">
      <div
        v-for="work in works"
        :key="work.id"
        class="work-item"
        role="button"
        :tabindex="0"
        :aria-label="work.title + ' — ' + work.year"
        @click="openWork(work)"
        @keydown.enter="openWork(work)"
        @keydown.space.prevent="openWork(work)"
      >
        <div
          class="work-image"
          :style="{ backgroundImage: 'url(' + work.images[work.thumbnailIndex].url + ')' }"
        >
          <div class="work-overlay">
            <div class="work-info">
              <h2>{{ work.title }}</h2>
              <p class="work-meta">{{ work.year }} — {{ work.category }}</p>
            </div>
          </div>
        </div>
      </div>
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
          <span class="close-icon">&times;</span>
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
            >
              <div class="modal-image-overlay"></div>
            </div>

            <button
              v-if="selectedWork.images.length > 1"
              class="nav-button prev"
              @click.stop="prevImage"
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <button
              v-if="selectedWork.images.length > 1"
              class="nav-button next"
              @click.stop="nextImage"
              aria-label="Next image"
            >
              &#8250;
            </button>

            <div
              v-if="selectedWork.images.length > 1"
              class="image-indicators"
              role="tablist"
              aria-label="Image gallery"
            >
              <button
                v-for="(image, index) in selectedWork.images"
                :key="index"
                :class="['indicator', { active: currentImageIndex === index }]"
                :aria-label="'Image ' + (index + 1) + ' of ' + selectedWork.images.length"
                :aria-selected="currentImageIndex === index"
                role="tab"
                @click.stop="goToImage(index)"
              ></button>
            </div>
          </div>

          <div class="modal-info">
            <h2>{{ selectedWork.title }}</h2>
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
  padding: 120px 0 4rem;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.portfolio-header {
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 0 2rem;
  text-align: center;
}

.portfolio-header h1 {
  font-size: 3.5rem;
  font-weight: 300;
  margin-bottom: 2.5rem;
  letter-spacing: 1px;
  font-family: var(--font-heading);
  position: relative;
  display: inline-block;
}

.portfolio-header h1::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--accent-clay);
}

.portfolio-intro {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.8;
  font-family: var(--font-body);
  font-weight: 300;
  color: var(--text-secondary);
}

.category-header {
  max-width: 1200px;
  margin: 0 auto 2rem;
  padding: 0 2rem;
  text-align: left;
}

.category-header h2 {
  font-size: 2.2rem;
  font-weight: 300;
  color: var(--text-primary);
  font-family: var(--font-heading);
  position: relative;
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--border-light);
}

.installations-header {
  margin-top: 3rem;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.work-item {
  height: 400px;
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: var(--shadow-soft);
  transition: transform var(--transition-cubic);
}

.work-item:focus-visible {
  outline: 2px solid var(--accent-clay);
  outline-offset: 2px;
}

.work-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid var(--border-light);
  z-index: 2;
  pointer-events: none;
}

.work-item:hover {
  transform: translateY(-8px);
}

.work-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.work-item:hover .work-image {
  transform: scale(1.05);
}

.work-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(26, 23, 20, 0),
    rgba(26, 23, 20, 0.3) 60%,
    rgba(26, 23, 20, 0.8)
  );
  transition: background 0.4s ease;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  z-index: 1;
  cursor: pointer;
}

.work-item:hover .work-overlay {
  background: linear-gradient(
    to bottom,
    rgba(26, 23, 20, 0.2),
    rgba(26, 23, 20, 0.5) 60%,
    rgba(26, 23, 20, 0.9)
  );
}

.work-info {
  color: var(--text-primary);
  z-index: 1;
}

.work-info h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  font-weight: 300;
  font-family: var(--font-heading);
  position: relative;
  display: inline-block;
  padding-right: 30px;
}

.work-meta {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  font-family: var(--font-body);
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.work-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-primary-95);
  z-index: 1010;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  backdrop-filter: blur(8px);
}

.close-button {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 2rem;
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
  color: var(--accent-clay);
  transform: rotate(90deg);
}

.close-button:focus-visible {
  outline: 2px solid var(--accent-clay);
  outline-offset: 2px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  height: 85vh;
  width: 100%;
  background-color: var(--bg-primary);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  border: 1px solid var(--border-subtle);
}

.modal-image-container {
  width: 100%;
  height: 60%;
  position: relative;
  overflow: hidden;
}

.modal-image {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 0.3s ease;
  position: relative;
}

.modal-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(26, 23, 20, 0.3), transparent 25%);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(26, 23, 20, 0.6);
  border: 1px solid var(--border-light);
  width: 44px;
  height: 44px;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
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
}

.nav-button:focus-visible {
  outline: 2px solid var(--accent-clay);
  outline-offset: 2px;
}

.image-indicators {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 1;
  padding: 10px;
  background-color: rgba(26, 23, 20, 0.3);
  border-radius: 20px;
  backdrop-filter: blur(4px);
}

.indicator {
  width: 8px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  border-radius: 0;
  transition: all var(--transition-smooth);
  padding: 0;
  transform: rotate(45deg);
}

.indicator.active {
  background-color: var(--accent-clay);
  transform: rotate(45deg) scale(1.2);
  box-shadow: 0 0 5px rgba(199, 140, 96, 0.5);
}

.indicator:focus-visible {
  outline: 2px solid var(--accent-clay);
  outline-offset: 4px;
}

.modal-info {
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
  border-top: 1px solid var(--border-subtle);
}

.modal-info h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 300;
  color: var(--text-primary);
  font-family: var(--font-heading);
  position: relative;
  display: inline-block;
}

.modal-info h2::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--accent-clay);
}

.work-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
  font-family: var(--font-body);
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-label {
  font-size: 0.9rem;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.detail-value {
  font-size: 1.1rem;
  color: var(--text-primary);
}

.work-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  font-family: var(--font-body);
  font-weight: 300;
  white-space: pre-line;
}

@media (min-width: 768px) {
  .modal-content {
    flex-direction: row;
    height: auto;
    max-height: 85vh;
  }

  .modal-image-container {
    width: 60%;
    height: auto;
  }

  .modal-info {
    width: 40%;
    border-top: none;
    border-left: 1px solid var(--border-subtle);
  }
}

@media (max-width: 768px) {
  .works-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  .portfolio-header h1 {
    font-size: 2.8rem;
  }

  .work-item {
    height: 320px;
  }

  .work-info h2 {
    font-size: 1.5rem;
  }

  .modal-content {
    height: 90vh;
  }

  .modal-image-container {
    height: 50%;
  }

  .nav-button {
    width: 38px;
    height: 38px;
    font-size: 1.4rem;
  }

  .image-indicators {
    bottom: 0.5rem;
    gap: 6px;
    padding: 6px 8px;
  }

  .indicator {
    width: 6px;
    height: 6px;
  }
}

@media (max-width: 480px) {
  .works-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-header h1 {
    font-size: 2.2rem;
  }

  .portfolio-intro {
    font-size: 1rem;
  }

  .close-button {
    top: 1rem;
    right: 1rem;
  }

  .nav-button {
    width: 34px;
    height: 34px;
    font-size: 1.2rem;
  }

  .image-indicators {
    bottom: 0.3rem;
    gap: 5px;
    padding: 5px 7px;
  }

  .indicator {
    width: 5px;
    height: 5px;
  }
}
</style>
