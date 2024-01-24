// https://nuxt.com/docs/api/configuration/nuxt-config
const appName = 'location-note'
const appDescription = "Location Note"

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
  ],
  pwa: {
    scope: '/',
    base: '/',
    injectRegister: 'auto',
    registerType: 'autoUpdate',
    manifest: {
      name: appName,
      short_name: appName,
      description: appDescription,
      theme_color: "#1867c0",
      background_color: "#1867c0",
      screenshots: [{
          "src": "pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "form_factor": "wide",
      }],
      icons: [
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
    registerWebManifestInRouteRules: true,
    workbox: {
      navigateFallback: undefined,
      cleanupOutdatedCaches: true,
      globPatterns: ['**/*.{json,ico,svg,ttf,woff,css,scss,js,html,txt,jpg,png,woff2,mjs,otf,ani}'],
      runtimeCaching: [
        {
          urlPattern: "/",
          handler: 'NetworkFirst',
        },
        {
          urlPattern: /^https:\/\/api\.mapbox\.com\/.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "mapbox-cache",
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    client: {
      installPrompt: false,
      periodicSyncForUpdates: 20, //seconds
    },
    devOptions: {
      enabled: true,
      suppressWarnings: false,
      navigateFallback: 'index.html',
      type: 'module',
    },
  },
  //css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  //build: {
  //  transpile: ['vuetify'],
  //},
  runtimeConfig: {
    public: {
      MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    },
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
