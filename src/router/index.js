import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('../views/PortfolioView.vue'),
    },
    {
      path: '/biography',
      name: 'biography',
      component: () => import('../views/BiographyView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    // Add a catch-all route for GitHub Pages that handles 404s properly
    {
      path: '/:pathMatch(.*)*',
      redirect: (to) => {
        console.warn('Route not found, redirecting to home:', to.fullPath)
        return '/'
      },
    },
  ],
  // Add scroll behavior for better UX
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Add navigation guard to clean up URLs if needed
router.beforeEach((to, from, next) => {
  // If we still have any problematic URL patterns in the current URL, clean them
  const location = window.location
  if (location.search && (location.search.includes('~and~') || location.search.includes('?/'))) {
    // Let the cleanup scripts in App.vue and index.html handle it
    next()
    return
  }
  next()
})

export default router
