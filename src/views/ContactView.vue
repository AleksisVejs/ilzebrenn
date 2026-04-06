<script setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t } = useI18n()

const contactInfo = {
  email: 'ilzebrenn@gmail.com',
  phone: '+371 25152311',
  instagram: '@e.brenn',
}

const formData = ref({
  name: '',
  email: '',
  message: '',
})
const formStatus = ref('')

const submitViaMailto = () => {
  const subject = encodeURIComponent(`Message from ${formData.value.name}`)
  const body = encodeURIComponent(
    `Name: ${formData.value.name}\nEmail: ${formData.value.email}\n\n${formData.value.message}`,
  )
  window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`
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
        <a :href="'mailto:' + contactInfo.email" class="contact-card email-card">
          <div class="icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h3>{{ t('contact.email') }}</h3>
          <span class="contact-value">{{ contactInfo.email }}</span>
          <div class="card-divider"></div>
          <p class="card-description">{{ t('contact.email_desc') }}</p>
        </a>

        <a :href="'tel:' + contactInfo.phone" class="contact-card phone-card">
          <div class="icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <h3>{{ t('contact.phone') }}</h3>
          <span class="contact-value">{{ contactInfo.phone }}</span>
          <div class="card-divider"></div>
          <p class="card-description">{{ t('contact.phone_desc') }}</p>
        </a>

        <a href="https://instagram.com/e.brenn" target="_blank" rel="noopener noreferrer" class="contact-card instagram-card">
          <div class="icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </div>
          <h3>{{ t('contact.instagram') }}</h3>
          <span class="contact-value">{{ contactInfo.instagram }}</span>
          <div class="card-divider"></div>
          <p class="card-description">{{ t('contact.instagram_desc') }}</p>
        </a>
      </div>

      <div class="contact-form">
        <div class="form-header">
          <h2>{{ t('contact.form_title') }}</h2>
          <p>{{ t('contact.form_desc') }}</p>
        </div>

        <form @submit.prevent="submitViaMailto">
          <div class="form-group">
            <label for="contact-name">{{ t('contact.form_name') }}</label>
            <input
              id="contact-name"
              v-model="formData.name"
              type="text"
              required
              autocomplete="name"
            />
          </div>
          <div class="form-group">
            <label for="contact-email">{{ t('contact.form_email') }}</label>
            <input
              id="contact-email"
              v-model="formData.email"
              type="email"
              required
              autocomplete="email"
            />
          </div>
          <div class="form-group">
            <label for="contact-message">{{ t('contact.form_message') }}</label>
            <textarea
              id="contact-message"
              v-model="formData.message"
              required
              rows="6"
            ></textarea>
          </div>
          <button type="submit" class="submit-btn">
            {{ t('contact.form_send') }}
          </button>
        </form>

        <div v-if="formStatus === 'success'" class="form-message success" role="alert">
          {{ t('contact.form_success') }}
        </div>
        <div v-if="formStatus === 'error'" class="form-message error" role="alert">
          {{ t('contact.form_error') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact {
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.contact-header {
  background-color: var(--bg-primary);
  color: var(--text-primary);
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
  font-family: var(--font-heading);
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
  background-color: var(--accent-clay);
}

.header-intro {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-secondary);
  font-family: var(--font-body);
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
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-soft);
  transition: transform var(--transition-cubic);
  position: relative;
  overflow: hidden;
  display: block;
  text-decoration: none;
  color: var(--text-primary);
  cursor: pointer;
}

.contact-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, transparent, var(--accent-clay), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.contact-card:hover {
  transform: translateY(-8px);
}

.contact-card:hover::before {
  opacity: 1;
}

.contact-card:focus-visible {
  outline: 2px solid var(--accent-clay);
  outline-offset: 2px;
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
  color: var(--accent-clay);
  border: 1px solid var(--border-light);
  transition: all var(--transition-smooth);
}

.contact-card:hover .icon {
  background-color: var(--accent-clay);
  color: var(--text-primary);
}

.contact-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 400;
  color: var(--text-primary);
  font-family: var(--font-heading);
}

.contact-value {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: var(--accent-clay);
  font-size: 1.1rem;
  font-family: var(--font-body);
  transition: all var(--transition-smooth);
}

.contact-card:hover .contact-value {
  color: var(--text-primary);
}

.card-divider {
  width: 60px;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--border-medium), transparent);
  margin: 0 auto 1.5rem;
}

.card-description {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  font-family: var(--font-body);
}

.contact-form {
  max-width: 700px;
  margin: 4rem auto 0;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 3px;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--border-subtle);
}

.form-header {
  margin-bottom: 2rem;
  text-align: center;
}

.form-header h2 {
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 1rem;
  color: var(--text-primary);
  font-family: var(--font-heading);
}

.form-header p {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.6;
  font-family: var(--font-body);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-family: var(--font-body);
}

input,
textarea {
  width: 100%;
  padding: 0.8rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-light);
  border-radius: 3px;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 1rem;
  transition: all var(--transition-smooth);
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent-clay);
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
  color: var(--accent-clay);
  border: 1px solid var(--accent-clay);
  border-radius: 3px;
  cursor: pointer;
  font-size: 1rem;
  font-family: var(--font-body);
  transition: all var(--transition-smooth);
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  letter-spacing: 0.5px;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: var(--accent-clay);
  transition: all 0.4s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: -1;
}

.submit-btn:hover {
  color: var(--text-primary);
}

.submit-btn:hover::before {
  left: 0;
}

.submit-btn:focus-visible {
  outline: 2px solid var(--accent-clay);
  outline-offset: 2px;
}

.form-message {
  margin-top: 1.5rem;
  padding: 1rem;
  text-align: center;
  font-family: var(--font-body);
  border-radius: 3px;
}

.form-message.success {
  background-color: rgba(140, 199, 96, 0.1);
  border: 1px solid rgba(140, 199, 96, 0.3);
  color: #8cc760;
}

.form-message.error {
  background-color: rgba(199, 96, 96, 0.1);
  border: 1px solid rgba(199, 96, 96, 0.3);
  color: #c76060;
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
