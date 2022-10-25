import Main from "../pages/Main";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import UserPage from "../pages/UserPage";
import RegistrationPage from "@/pages/RegistrationPage";
import LoginPage from "@/pages/LoginPage"
import ActivationPage from "@/pages/ActivationPage";
import UsersListPage from "@/pages/UsersListPage";
import Chat from "@/pages/Chat";
import Messenger from "@/pages/Messenger";

const routes=[
    {path: '/', component: Main},
    {path: '/user', component: UserPage},
    {path: '/user/:login', component: UserPage},
    {path: '/signup', component: RegistrationPage},
    {path: '/login', component: LoginPage},
    {path: '/signup/activate', component: ActivationPage},
    {path: '/users', component: UsersListPage},
    {path: '/chat/:login', component: Chat},
    {path: '/messenger', component: Messenger},
    {path: '/signup/edit-info'}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = [
        '/login',
        '/signup',
        '/signup/activate'
    ]
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem('userToken')

    if(authRequired && !loggedIn){
        return next('/login')
    }
    next()
})

export default router;