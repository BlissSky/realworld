module.exports = {
    router: {
        linkActiveClass: 'active',
        extendRoutes(routes, resolve) {
            routes.splice(0)
            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout/index.vue'),
                    children:[
                        {
                            path: '',
                            name:'home',
                            component: resolve(__dirname, 'pages/home/index.vue')
                        },
                        {
                            path: '/login',
                            name:'login',
                            component: resolve(__dirname, 'pages/login/index.vue')
                        },
                        {
                            path: '/register',
                            name: 'register',
                            component: resolve(__dirname, 'pages/login/index.vue')
                        },
                        {
                            path: '/setting',
                            name: 'setting',
                            component: resolve(__dirname, 'pages/setting/index.vue')
                        },
                        {
                            path: '/editor',
                            name: 'editor',
                            component: resolve(__dirname, 'pages/editor/index.vue')
                        },
                        {
                            path: '/article/:slug',
                            name: 'article',
                            component: resolve(__dirname, 'pages/article/index.vue')
                        },
                        {
                            path: '/profile/:username',
                            name: 'profile',
                            component: resolve(__dirname, 'pages/profile/index.vue')
                        }
                    ]
                }
                
            ])
        }
    },
    
    plugins: [
       
        '~/plugins/request.js'
      ],
      head: {
        titleTemplate: '%s - Nuxt.js',
        title:'realword',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: 'Meta description' }
        ]
      }
}