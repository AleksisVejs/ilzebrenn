<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1>404</h1>
      <p class="not-found-title">{{ t('notFound.title') }}</p>
      <p class="not-found-message">{{ t('notFound.message') }}</p>
      <RouterLink to="/" class="back-home">{{ t('notFound.backHome') }}</RouterLink>
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
  max-width: 500px;
}

.not-found-content h1 {
  font-size: 8rem;
  font-weight: 300;
  font-family: var(--font-heading);
  color: var(--accent-clay);
  line-height: 1;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.not-found-title {
  font-size: 2rem;
  font-weight: 300;
  font-family: var(--font-heading);
  margin-bottom: 1rem;
}

.not-found-message {
  font-size: 1.1rem;
  color: var(--text-muted);
  font-family: var(--font-body);
  line-height: 1.8;
  margin-bottom: 2.5rem;
}

.back-home {
  display: inline-block;
  padding: 0.8rem 2rem;
  border: 1px solid var(--accent-clay);
  color: var(--accent-clay);
  text-decoration: none;
  font-family: var(--font-body);
  font-size: 1rem;
  letter-spacing: 0.5px;
  transition: all var(--transition-smooth);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.back-home::before {
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

.back-home:hover {
  color: var(--text-primary);
}

.back-home:hover::before {
  left: 0;
}

@media (max-width: 480px) {
  .not-found-content h1 {
    font-size: 5rem;
  }

  .not-found-title {
    font-size: 1.5rem;
  }
}
</style>
