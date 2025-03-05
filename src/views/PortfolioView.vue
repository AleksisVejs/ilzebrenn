<script setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t } = useI18n()

const works = [
  {
    id: 'funguy',
    title: t('portfolio.works.funguy.title'),
    description: t('portfolio.works.funguy.description'),
    year: '2023',
    material: 'Silk, Natural Dyes',
    dimensions: '120cm × 80cm',
    image: '/images/funguy-full.jpg',
    category: 'Textile Art',
  },
  {
    id: 'rainbow',
    title: t('portfolio.works.rainbow.title'),
    description: t('portfolio.works.rainbow.description'),
    year: '2023',
    material: 'Cotton, Synthetic Dyes',
    dimensions: '200cm × 150cm',
    image: '/images/rainbow-full.jpg',
    category: 'Installation',
  },
]

const selectedWork = ref(null)

const openWork = (work) => {
  selectedWork.value = work
  document.body.style.overflow = 'hidden'
}

const closeWork = () => {
  selectedWork.value = null
  document.body.style.overflow = 'auto'
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
        <div class="work-image" :style="{ backgroundImage: 'url(' + work.image + ')' }">
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
        <div class="modal-image" :style="{ backgroundImage: 'url(' + selectedWork.image + ')' }">
          <div class="modal-image-overlay"></div>
        </div>

        <div class="modal-info">
          <h2>{{ selectedWork.title }}</h2>
          <div class="work-details">
            <div class="detail-item">
              <span class="detail-label">Year</span>
              <span class="detail-value">{{ selectedWork.year }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Material</span>
              <span class="detail-value">{{ selectedWork.material }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Dimensions</span>
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
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2px;
  background-color: #111;
  padding: 2px;
  max-width: 1800px;
  margin: 0 auto;
}

.work-item {
  position: relative;
  cursor: pointer;
  aspect-ratio: 4/5;
  overflow: hidden;
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
}

.modal-image {
  flex: 1;
  background-size: cover;
  background-position: center;
  position: relative;
}

.modal-info {
  width: 400px;
  padding: 3rem;
  background-color: #111;
  overflow-y: auto;
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

@media (max-width: 1024px) {
  .works-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .modal-content {
    flex-direction: column;
    height: auto;
    max-height: 90vh;
  }

  .modal-image {
    height: 50vh;
  }

  .modal-info {
    width: 100%;
    padding: 2rem;
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
}
</style>
