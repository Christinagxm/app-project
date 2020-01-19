import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {path: '/objMonitor', name: 'objMonitor', component: () => import('../components/monitorTest/base-obj-monitor.vue')},
    {
        path: '/groupMonitor',
        name: 'groupMonitor',
        component: () => import('../components/monitorTest/monitor-group.vue')
    },
    {path: '/vCircle', name: 'vCircle', component: () =>import('../components/monitorTest/monitorComp/attr-chart') },
    {path: '/canvasTest', name: 'canvasTest', component: () =>import('../components/monitorTest/monitorComp/attr-pie-test.vue') }

]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router
