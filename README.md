# ilzebrenn

This is a portfolio website for Ilze Erba-Brenholma, a textile artist. The site is built with Vue 3 and Vite.

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages. When you push changes to the `main` branch, the site will be automatically built and deployed to GitHub Pages.

You can access the live site at: https://[your-github-username].github.io/ilzebrenn/

### Custom Domain Setup

To use a custom domain:

1. Update the `public/CNAME` file with your domain name
2. Configure your DNS settings as described in [GitHub Pages documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Preview Production Build Locally

```sh
npm run preview
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Project Structure

- `src/` - Source code
  - `assets/` - Static assets like CSS and images
  - `components/` - Vue components
  - `router/` - Vue Router configuration
  - `views/` - Vue views/pages
  - `i18n/` - Internationalization files
- `public/` - Static files that will be copied to the root of the build
- `.github/workflows/` - GitHub Actions workflows for CI/CD
