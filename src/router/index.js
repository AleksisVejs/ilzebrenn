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
    // Add a catch-all route for GitHub Pages
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
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

// Add a global navigation guard to clean up URLs
router.beforeEach((to, from, next) => {
  // Check if we're coming from a problematic URL
  if (from.fullPath.includes('/?') || from.fullPath.includes('~and~')) {
    // Get the clean path from the destination
    const cleanPath = to.path

    // Replace the URL with the clean path
    window.history.replaceState(null, null, cleanPath)
  }

  next()
})

// Add a global after-navigation hook to ensure URLs are clean
router.afterEach((to) => {
  // Check if the URL has query parameters or hash that needs cleanup
  if (
    window.location.search ||
    window.location.pathname.includes('/?') ||
    window.location.hash.includes('?')
  ) {
    // Replace with clean path
    window.history.replaceState(null, null, to.path)
  }
})

export default router
