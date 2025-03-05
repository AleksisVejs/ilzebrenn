import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// We need a function to parse GitHub Pages redirect URLs
const getGitHubPagesPath = () => {
  // If not on GitHub Pages (has custom domain), skip this logic
  if (window.location.hostname !== 'ilzebrenn.github.io') {
    return null
  }

  const search = window.location.search
  // Check if we have a GitHub Pages-style redirect (/?/path)
  const pathMatch = search.match(/^\?\/(.*?)($|&|~and~)/)
  if (pathMatch && pathMatch[1]) {
    // Return just the path part and decode URL encoding
    let cleanPath = '/' + pathMatch[1].split('&')[0].split('~and~')[0]

    // Clean up any percent encoding or unwanted characters
    try {
      cleanPath = decodeURIComponent(cleanPath)
    } catch (e) {
      // If decoding fails, use the raw path
      console.error('Failed to decode URL', e)
    }

    // Remove any remaining % characters
    cleanPath = cleanPath.replace(/%/g, '')

    return cleanPath
  }
  return null
}

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

// Add navigation guard to handle GitHub Pages redirects
router.beforeEach((to, from, next) => {
  // Only run on initial page load (from is empty)
  // And only on GitHub Pages (not on custom domain)
  if (from.name === undefined && window.location.hostname === 'ilzebrenn.github.io') {
    const githubPagesPath = getGitHubPagesPath()
    if (githubPagesPath) {
      // If we detected a GitHub Pages redirect path, redirect to the real path
      return next(githubPagesPath)
    }
  }

  // Detect redirect loops with ~and~ parameters
  const location = window.location
  if (
    location.search &&
    location.search.includes('~and~') &&
    location.search.split('~and~').length > 3
  ) {
    // Just go to home if we detect a redirect loop
    return next('/')
  }

  // Continue with normal navigation
  next()
})

export default router
