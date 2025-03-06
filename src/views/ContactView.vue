<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const contactInfo = {
  email: 'ilzebrenn@gmail.com',
  phone: '+371 25152311',
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

        <div class="contact-card phone-card">
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
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
              ></path>
            </svg>
          </div>
          <h3>{{ t('contact.phone') }}</h3>
          <a :href="'tel:' + contactInfo.phone" class="contact-link primary-link">
            {{ contactInfo.phone }}
          </a>
          <div class="card-divider"></div>
          <p class="card-description">{{ t('contact.phone_desc') }}</p>
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact {
  min-height: 100vh;
  background-color: #1a1714;
  color: white;
}

.contact-header {
  background-color: #1a1714;
  color: white;
  padding: 120px 2rem 4rem;
  text-align: center;
}

.header-content {
  max-width: 1000px;
  margin: 0 auto;
}

.contact-header h1 {
  font-size: 3.5rem;
  font-weight: 300;
  margin-bottom: 2.5rem;
  font-family: 'Cormorant Garamond', serif;
  position: relative;
  display: inline-block;
}

.contact-header h1::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--accent-clay, #c78c60);
}

.header-intro {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
}

.contact-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.contact-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.contact-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, transparent, var(--accent-clay, #c78c60), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.contact-card:hover {
  transform: translateY(-8px);
}

.contact-card:hover::before {
  opacity: 1;
}

.icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: var(--accent-clay, #c78c60);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.contact-card:hover .icon {
  background-color: var(--accent-clay, #c78c60);
  color: white;
}

.contact-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 400;
  color: white;
  font-family: 'Cormorant Garamond', serif;
}

.contact-link {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: var(--accent-clay, #c78c60);
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;
  font-family: 'Raleway', sans-serif;
}

.contact-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--accent-clay, #c78c60);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-link:hover {
  color: white;
}

.contact-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.card-divider {
  width: 60px;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
  margin: 0 auto 1.5rem;
}

.card-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.6;
  font-family: 'Raleway', sans-serif;
}

.contact-form {
  max-width: 700px;
  margin: 4rem auto 0;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 3px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.form-header {
  margin-bottom: 2rem;
  text-align: center;
}

.form-header h2 {
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 1rem;
  color: white;
  font-family: 'Cormorant Garamond', serif;
}

.form-header p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.6;
  font-family: 'Raleway', sans-serif;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-family: 'Raleway', sans-serif;
}

input,
textarea {
  width: 100%;
  padding: 0.8rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  color: white;
  font-family: 'Raleway', sans-serif;
  transition: all 0.3s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent-clay, #c78c60);
  background-color: rgba(255, 255, 255, 0.08);
}

textarea {
  resize: vertical;
  min-height: 150px;
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 1rem;
  background: transparent;
  color: var(--accent-clay, #c78c60);
  border: 1px solid var(--accent-clay, #c78c60);
  border-radius: 3px;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Raleway', sans-serif;
  transition: all 0.3s ease;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: var(--accent-clay, #c78c60);
  transition: all 0.4s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: -1;
}

.submit-btn:hover {
  color: white;
}

.submit-btn:hover::before {
  left: 0;
}

@media (max-width: 768px) {
  .contact-header h1 {
    font-size: 2.8rem;
  }

  .header-intro {
    font-size: 1.1rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }

  .contact-content {
    padding: 2rem 1rem;
  }
}

@media (max-width: 480px) {
  .contact-header h1 {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
  }

  .header-intro {
    font-size: 1rem;
  }

  .contact-card {
    padding: 1.5rem;
  }

  .contact-form {
    padding: 1.5rem;
  }

  .form-header h2 {
    font-size: 1.5rem;
  }
}
</style>
