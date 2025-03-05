<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const contactInfo = {
  email: 'ilzebrenn@gmail.com',
  instagram: '@e.brenn',
  location: 'Riga, Latvia',
}
</script>

<template>
  <div class="contact">
    <div class="contact-header">
      <div class="header-content">
        <h1>{{ t('nav.contact') }}</h1>
        <p class="header-intro">{{ t('contact.intro') }}</p>
      </div>
    </div>

    <div class="contact-content">
      <div class="contact-grid">
        <div class="contact-card email-card">
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h3>{{ t('contact.email') }}</h3>
          <a :href="'mailto:' + contactInfo.email" class="contact-link primary-link">
            {{ contactInfo.email }}
          </a>
          <div class="card-divider"></div>
          <p class="card-description">{{ t('contact.email_desc') }}</p>
        </div>

        <div class="contact-card instagram-card">
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </div>
          <h3>{{ t('contact.instagram') }}</h3>
          <a
            href="https://instagram.com/e.brenn"
            target="_blank"
            rel="noopener"
            class="contact-link primary-link"
          >
            {{ contactInfo.instagram }}
          </a>
          <div class="card-divider"></div>
          <p class="card-description">{{ t('contact.instagram_desc') }}</p>
        </div>

        <div class="contact-card location-card">
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h3>{{ t('contact.location') }}</h3>
          <p class="location primary-text">{{ contactInfo.location }}</p>
          <div class="card-divider"></div>
          <p class="card-description">{{ t('contact.location_desc') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.contact-header {
  background-color: #000;
  color: white;
  padding: 120px 2rem 6rem;
  position: relative;
}

.header-content {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.contact-header h1 {
  font-size: 3.5rem;
  font-weight: 300;
  margin-bottom: 2rem;
  letter-spacing: 1px;
}

.header-intro {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.3rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
}

.contact-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10rem 2rem;
  position: relative;
  z-index: 2;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 4rem;
}

.contact-card {
  background-color: white;
  padding: 3rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  border-radius: 50%;
  color: #000;
  transition: all 0.3s ease;
}

.contact-card:hover .icon {
  background-color: #000;
  color: white;
}

.contact-card h3 {
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: #333;
}

.primary-link,
.primary-text {
  font-size: 1.2rem;
  font-weight: 500;
  color: #000;
  margin-bottom: 1.5rem;
}

.contact-link {
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-link:hover {
  color: #666;
}

.card-divider {
  width: 40px;
  height: 2px;
  background-color: #000;
  margin: 1.5rem 0;
}

.card-description {
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  flex-grow: 1;
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .contact-header h1 {
    font-size: 2.5rem;
  }

  .header-intro {
    font-size: 1.1rem;
  }

  .contact-content {
    padding: 6rem 1.5rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 0;
  }

  .contact-card {
    padding: 2rem;
  }
}
</style>
