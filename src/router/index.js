import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import signin from '../components/signin.vue'
import signup from '../components/signup.vue'
import Login1 from '../components/login.vue'
import index from '../components/index.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        children: [
            { path: '/', name: 'Login1', component: Login1 },
            { path: 'signin', name: 'signin', component: signin },
            { path: 'signup', name: 'signup', component: signup },
            { path: '', redirect: 'Login1' }
        ]
    },
    {
        path: '/',
        name: 'Home',
        component: index,
        meta: {
            requireAuth: true
        },
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
