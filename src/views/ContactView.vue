<script setup>
import { useI18n } from 'vue-i18n'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

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

const revealedSections = reactive({})
const sectionEls = ref({})
let revealObserver = null

const setSectionEl = (el, id) => {
  if (!el) {
    delete sectionEls.value[id]
    return
  }
  sectionEls.value[id] = el
}

const submitViaMailto = () => {
  const subject = encodeURIComponent(`Message from ${formData.value.name}`)
  const body = encodeURIComponent(
    `Name: ${formData.value.name}\nEmail: ${formData.value.email}\n\n${formData.value.message}`,
  )
  window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`
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
  <div class="contact">
    <div class="contact-header">
      <span class="header-label">{{ t('nav.contact') }}</span>
      <h1>{{ t('contact.title') }}</h1>
      <p class="header-intro">{{ t('contact.intro') }}</p>
    </div>

    <div class="contact-body">
      <!-- Contact Methods -->
      <div
        class="contact-methods"
        data-reveal="methods"
        :ref="(el) => setSectionEl(el, 'methods')"
        :class="{ revealed: revealedSections['methods'] }"
      >
        <a :href="'mailto:' + contactInfo.email" class="method-card">
          <div class="method-card__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div class="method-card__body">
            <h3>{{ t('contact.email') }}</h3>
            <span class="method-card__value">{{ contactInfo.email }}</span>
            <p class="method-card__desc">{{ t('contact.email_desc') }}</p>
          </div>
        </a>

        <a :href="'tel:' + contactInfo.phone" class="method-card">
          <div class="method-card__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <div class="method-card__body">
            <h3>{{ t('contact.phone') }}</h3>
            <span class="method-card__value">{{ contactInfo.phone }}</span>
            <p class="method-card__desc">{{ t('contact.phone_desc') }}</p>
          </div>
        </a>

        <a href="https://instagram.com/e.brenn" target="_blank" rel="noopener noreferrer" class="method-card">
          <div class="method-card__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </div>
          <div class="method-card__body">
            <h3>{{ t('contact.instagram') }}</h3>
            <span class="method-card__value">{{ contactInfo.instagram }}</span>
            <p class="method-card__desc">{{ t('contact.instagram_desc') }}</p>
          </div>
        </a>

        <div class="method-card method-card--location">
          <div class="method-card__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div class="method-card__body">
            <h3>{{ t('contact.location') }}</h3>
            <span class="method-card__value">Riga, Latvia</span>
            <p class="method-card__desc">{{ t('contact.location_desc') }}</p>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div
        class="form-section"
        data-reveal="form"
        :ref="(el) => setSectionEl(el, 'form')"
        :class="{ revealed: revealedSections['form'] }"
      >
        <div class="form-section__head">
          <h2>{{ t('contact.form_title') }}</h2>
          <p>{{ t('contact.form_desc') }}</p>
        </div>

        <form @submit.prevent="submitViaMailto">
          <div class="field">
            <label for="contact-name">{{ t('contact.form_name') }}</label>
            <input
              id="contact-name"
              v-model="formData.name"
              type="text"
              required
              autocomplete="name"
            />
          </div>
          <div class="field">
            <label for="contact-email">{{ t('contact.form_email') }}</label>
            <input
              id="contact-email"
              v-model="formData.email"
              type="email"
              required
              autocomplete="email"
            />
          </div>
          <div class="field">
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>

        <div v-if="formStatus === 'success'" class="form-message form-message--success" role="alert">
          {{ t('contact.form_success') }}
        </div>
        <div v-if="formStatus === 'error'" class="form-message form-message--error" role="alert">
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

/* ===== HEADER ===== */
.contact-header {
  max-width: 700px;
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

.contact-header h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 300;
  margin-bottom: 1.5rem;
  font-family: var(--font-heading);
  letter-spacing: 1px;
}

.header-intro {
  font-size: 1.1rem;
  line-height: 1.9;
  color: var(--text-muted);
  font-family: var(--font-body);
  font-weight: 300;
}

/* ===== BODY ===== */
.contact-body {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem 6rem;
}

/* ===== CONTACT METHODS ===== */
.contact-methods {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background-color: var(--border-subtle);
  border: 1px solid var(--border-subtle);
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}

.contact-methods.revealed {
  opacity: 1;
  transform: translateY(0);
}

.method-card {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 2rem;
  background-color: var(--bg-primary);
  text-decoration: none;
  color: var(--text-primary);
  transition: background-color var(--transition-smooth);
}

a.method-card {
  cursor: pointer;
}

.method-card:hover {
  background-color: var(--bg-warm);
}

.method-card__icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-clay);
  border: 1px solid var(--border-light);
  flex-shrink: 0;
  transition: all var(--transition-smooth);
}

.method-card:hover .method-card__icon {
  background-color: var(--accent-clay);
  color: var(--bg-primary);
  border-color: var(--accent-clay);
}

.method-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.method-card h3 {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-faint);
  font-family: var(--font-body);
}

.method-card__value {
  font-size: 1.05rem;
  color: var(--text-primary);
  font-family: var(--font-body);
  transition: color var(--transition-smooth);
}

.method-card:hover .method-card__value {
  color: var(--accent-clay);
}

.method-card__desc {
  font-size: 0.85rem;
  color: var(--text-faint);
  font-family: var(--font-body);
  line-height: 1.5;
  margin-top: 0.2rem;
}

/* ===== FORM ===== */
.form-section {
  max-width: 600px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}

.form-section.revealed {
  opacity: 1;
  transform: translateY(0);
}

.form-section__head {
  text-align: center;
  margin-bottom: 2.5rem;
}

.form-section__head h2 {
  font-size: clamp(1.6rem, 3vw, 2rem);
  font-weight: 300;
  margin-bottom: 0.8rem;
  color: var(--text-primary);
  font-family: var(--font-heading);
}

.form-section__head p {
  color: var(--text-faint);
  font-size: 0.95rem;
  line-height: 1.6;
  font-family: var(--font-body);
}

.field {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-faint);
  font-size: 0.75rem;
  font-family: var(--font-body);
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

input,
textarea {
  width: 100%;
  padding: 0.9rem 1rem;
  background-color: transparent;
  border: 1px solid var(--border-light);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 1rem;
  transition: all var(--transition-smooth);
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent-clay);
  background-color: rgba(199, 140, 96, 0.03);
}

textarea {
  resize: vertical;
  min-height: 150px;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 2.2rem;
  background: var(--accent-clay);
  color: var(--bg-primary);
  border: 1px solid var(--accent-clay);
  cursor: pointer;
  font-size: 0.85rem;
  font-family: var(--font-body);
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: all var(--transition-smooth);
  margin-top: 0.5rem;
}

.submit-btn:hover {
  background: var(--accent-clay-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(199, 140, 96, 0.2);
}

.submit-btn:focus-visible {
  outline: 2px solid var(--accent-clay);
  outline-offset: 4px;
}

.submit-btn svg {
  transition: transform var(--transition-smooth);
}

.submit-btn:hover svg {
  transform: translateX(3px);
}

/* ===== FORM MESSAGES ===== */
.form-message {
  margin-top: 1.5rem;
  padding: 1rem;
  text-align: center;
  font-family: var(--font-body);
  font-size: 0.95rem;
}

.form-message--success {
  background-color: rgba(140, 199, 96, 0.08);
  border: 1px solid rgba(140, 199, 96, 0.25);
  color: #8cc760;
}

.form-message--error {
  background-color: rgba(199, 96, 96, 0.08);
  border: 1px solid rgba(199, 96, 96, 0.25);
  color: #c76060;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .contact-header {
    padding: 8rem 1.5rem 3rem;
  }

  .contact-body {
    padding: 0 1.5rem 4rem;
  }

  .contact-methods {
    grid-template-columns: 1fr;
  }

  .method-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .method-card {
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.2rem;
  }

  .submit-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
