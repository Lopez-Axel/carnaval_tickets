// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  app: {
    head: {
      title: 'Validador de Tickets - Carnaval Oruro 2025',
      htmlAttrs: {
        lang: 'es'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Validación de tickets para Carnaval de Oruro' },
        { name: 'robots', content: 'noindex, nofollow' } // Opcional: no indexar en buscadores
      ],
      link: [
        { 
          rel: 'stylesheet', 
          href: 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css' 
        }
      ]
    }
  },

})