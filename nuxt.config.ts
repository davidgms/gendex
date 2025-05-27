// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@formkit/auto-animate/nuxt',
    'nuxt-viewport',
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  image: {
    provider: 'cloudinary',
    cloudinary: {
      baseURL: `https://res.cloudinary.com/dssqs4a1p/image/fetch/f_auto,q_auto/`,
    }
  },
  fonts: {
    families: [
      {
        name: 'Outfit',
        provider: 'google'
      }
    ]
  }
})