<script setup>
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'

const { t } = useI18n()

const getWorks = () => [
  {
    id: 'funguy',
    title: t('portfolio.works.funguy.title'),
    description: t('portfolio.works.funguy.description'),
    year: '2023',
    material: t('portfolio.works.funguy.material'),
    dimensions: '150x30x30cm',
    images: [
      {
        url: '/images/funguy-full.jpg',
        alt: 'Fun-guy installation full view',
      },
      {
        url: '/images/funguy1.jpg',
        alt: 'Fun-guy installation detail 1',
      },
      {
        url: '/images/hero-bg.jpg',
        alt: 'Fun-guy installation detail 3',
      },
      {
        url: '/images/funguy4.jpg',
        alt: 'Fun-guy installation detail 2',
      },
    ],
    thumbnailIndex: 0,
    category: t('portfolio.works.funguy.category'),
  },
  {
    id: 'rainbow',
    title: t('portfolio.works.rainbow.title'),
    description: t('portfolio.works.rainbow.description'),
    year: '2023',
    material: t('portfolio.works.rainbow.material'),
    dimensions: '200x150cm',
    images: [
      {
        url: '/images/rainbow-full.jpg',
        alt: 'Varavīksnene full view',
      },
    ],
    thumbnailIndex: 0,
    category: t('portfolio.works.rainbow.category'),
  },
]

const works = computed(() => getWorks())

const selectedWork = ref(null)
const currentImageIndex = ref(0)

const openWork = (work) => {
  selectedWork.value = work
  currentImageIndex.value = 0
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.width = '100%'
  document.body.style.top = `-${window.scrollY}px`
}

const closeWork = () => {
  const scrollY = document.body.style.top
  document.body.style.position = ''
  document.body.style.width = ''
  document.body.style.top = ''
  document.body.style.overflow = ''
  window.scrollTo(0, parseInt(scrollY || '0') * -1)
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
</script>

<template>
  <div class="portfolio">
    <div class="portfolio-header">
      <h1>{{ t('portfolio.title') }}</h1>
      <p class="portfolio-intro">{{ t('portfolio.intro') }}</p>
    </div>

    <div class="works-grid">
      <div v-for="work in works" :key="work.id" class="work-item" @click="openWork(work)">
        <div
          class="work-image"
          :style="{ backgroundImage: 'url(' + work.images[work.thumbnailIndex].url + ')' }"
        >
          <div class="work-overlay">
            <div class="work-info">
              <h2>{{ work.title }}</h2>
              <p class="work-meta">{{ work.year }} - {{ work.category }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Work Detail Modal -->
    <div v-if="selectedWork" class="work-modal" @click.self="closeWork">
      <button class="close-button" @click="closeWork">
        <span class="close-icon">×</span>
      </button>

      <div class="modal-content">
        <div class="modal-image-container">
          <div
            class="modal-image"
            :style="{ backgroundImage: 'url(' + selectedWork.images[currentImageIndex].url + ')' }"
          >
            <div class="modal-image-overlay"></div>
          </div>

          <!-- Image Navigation -->
          <button
            v-if="selectedWork.images.length > 1"
            class="nav-button prev"
            @click.stop="prevImage"
          >
            ‹
          </button>
          <button
            v-if="selectedWork.images.length > 1"
            class="nav-button next"
            @click.stop="nextImage"
          >
            ›
          </button>

          <!-- Image Indicators -->
          <div v-if="selectedWork.images.length > 1" class="image-indicators">
            <button
              v-for="(image, index) in selectedWork.images"
              :key="index"
              :class="['indicator', { active: currentImageIndex === index }]"
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
  </div>
</template>

<style scoped>
.portfolio {
  min-height: 100vh;
  padding: 120px 0 4rem;
  background-color: #000;
  color: white;
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
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
}

.portfolio-intro {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
  gap: 2px;
  background-color: #111;
  padding: 2px;
  width: min(1800px, 100%);
  margin: 0 auto;
}

.work-item {
  position: relative;
  cursor: pointer;
  aspect-ratio: 4/5;
  overflow: hidden;
  min-width: 0; /* Prevent overflow in grid items */
}

.work-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.work-item:hover .work-image {
  transform: scale(1.05);
}

.work-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.8));
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 2rem;
}

.work-item:hover .work-overlay {
  opacity: 1;
}

.work-info h2 {
  font-size: 1.8rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.work-meta {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  transform: translateY(20px);
  transition: transform 0.3s ease 0.1s;
}

.work-item:hover .work-info h2,
.work-item:hover .work-meta {
  transform: translateY(0);
}

/* Modal Styles */
.work-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
}

.close-button {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  transition: transform 0.3s ease;
}

.close-button:hover {
  transform: rotate(90deg);
}

.modal-content {
  display: flex;
  max-width: 1400px;
  width: 100%;
  height: 80vh;
  background-color: #111;
  position: relative;
  overflow: hidden;
}

.modal-image-container {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.modal-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.modal-info {
  width: 400px;
  padding: 3rem;
  background-color: #111;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.modal-info::-webkit-scrollbar {
  width: 6px;
}

.modal-info::-webkit-scrollbar-track {
  background: transparent;
}

.modal-info::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.modal-info h2 {
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 2rem;
  line-height: 1.2;
}

.work-details {
  margin-bottom: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-item {
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-label {
  display: block;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.3rem;
}

.detail-value {
  font-size: 1.1rem;
}

.work-description {
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  width: 50px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 2;
}

.nav-button:hover {
  background: rgba(0, 0, 0, 0.8);
}

.nav-button.prev {
  left: 0;
}

.nav-button.next {
  right: 0;
}

.image-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 2;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.indicator.active {
  background: white;
}

@media (min-width: 1025px) {
  .works-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(600px, 100%), 1fr));
  }
}

@media (max-width: 1024px) {
  .works-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
  }

  .modal-content {
    flex-direction: column;
    height: 90vh;
    max-height: 90vh;
    overflow: hidden;
  }

  .modal-image {
    height: 50vh;
    min-height: 300px;
  }

  .modal-info {
    width: 100%;
    height: auto;
    max-height: 40vh;
    padding: 2rem;
  }

  .nav-button {
    width: 40px;
    height: 60px;
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .portfolio {
    padding: 100px 0 2rem;
  }

  .portfolio-header {
    padding: 0 1rem;
    margin-bottom: 2rem;
  }

  .portfolio-header h1 {
    font-size: 2.5rem;
  }

  .works-grid {
    grid-template-columns: 1fr;
  }

  .work-overlay {
    opacity: 1;
    background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.8));
  }

  .work-info h2,
  .work-meta {
    transform: translateY(0);
  }

  .modal-image {
    height: 40vh;
  }

  .modal-info h2 {
    font-size: 2rem;
  }

  .nav-button {
    width: 35px;
    height: 50px;
    font-size: 1.2rem;
  }
}
</style>
