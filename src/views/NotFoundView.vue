<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="not-found">
    <div class="not-found-content">
      <div class="decor">
        <span></span><span></span><span></span>
      </div>
      <h1>404</h1>
      <p class="not-found-title">{{ t('notFound.title') }}</p>
      <p class="not-found-message">{{ t('notFound.message') }}</p>
      <RouterLink to="/" class="back-home">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        {{ t('notFound.backHome') }}
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  padding: 2rem;
}

.not-found-content {
  text-align: center;
  max-width: 440px;
}

.decor {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 2rem;
}

.decor span {
  display: block;
  background-color: var(--accent-clay);
}

.decor span:nth-child(1),
.decor span:nth-child(3) {
  width: 3px;
  height: 3px;
  opacity: 0.4;
}

.decor span:nth-child(2) {
  width: 5px;
  height: 5px;
  opacity: 0.7;
}

.not-found-content h1 {
  font-size: clamp(5rem, 15vw, 9rem);
  font-weight: 300;
  font-family: var(--font-heading);
  color: var(--accent-clay);
  line-height: 1;
  margin-bottom: 1rem;
  opacity: 0.3;
  letter-spacing: 4px;
}

.not-found-title {
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 300;
  font-family: var(--font-heading);
  margin-bottom: 1rem;
}

.not-found-message {
  font-size: 1rem;
  color: var(--text-muted);
  font-family: var(--font-body);
  line-height: 1.8;
  margin-bottom: 2.5rem;
  font-weight: 300;
}

.back-home {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 2rem;
  border: 1px solid var(--border-medium);
  color: var(--text-secondary);
  text-decoration: none;
  font-family: var(--font-body);
  font-size: 0.85rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: all var(--transition-smooth);
}

.back-home svg {
  transition: transform var(--transition-smooth);
}

.back-home:hover {
  border-color: var(--accent-clay);
  color: var(--accent-clay);
}

.back-home:hover svg {
  transform: translateX(-3px);
}

.back-home:focus-visible {
  outline: 2px solid var(--accent-clay);
  outline-offset: 4px;
}
</style>
