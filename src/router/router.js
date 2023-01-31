import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import mainVuetify from "@/pages/MainPage";
import usersVuetify from "@/pages/UsersPage";
import helloVuetify from "@/pages/HelloPage";
import user from "@/pages/User";

const routes = [
    // {path: '/signup/edit-info'},
    // {path: '/main', component: mainVuetify},
    // {path: '/users', component: usersVuetify},
    {path: '/user', component: user}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = [
        '/',
        '/user',
    ]
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem('userToken')

    if (authRequired && !loggedIn) {
        return next('/')
    }
    next()
})

export default router;