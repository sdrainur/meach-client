import Main from "../pages/Main";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import UserPage from "../pages/UserPage";
import RegistrationPage from "@/pages/RegistrationPage";
import LoginPage from "@/pages/LoginPage"
import ActivationPage from "@/pages/ActivationPage";
import UsersListPage from "@/pages/UsersListPage";
import Chat from "@/pages/Chat";
import Messenger from "@/pages/Messenger";
import mainVuetify from "@/pages/main-vuetify";
import loginVuetify from "@/pages/login-vuetify";
import loginPage from "@/pages/LoginPage";
import usersVuetify from "@/pages/users-vuetify";
import helloVuetify from "@/pages/hello-vuetify";

const routes=[
    // {path: '/', component: Main},
    {path: '/user', component: UserPage},
    {path: '/user/:login', component: UserPage},
    {path: '/signup', component: RegistrationPage},
    {path: '/login', component: loginVuetify},
    {path: '/signup/activate', component: ActivationPage},
    {path: '/users', component: UsersListPage},
    {path: '/chat/:login', component: Chat},
    {path: '/messenger', component: Messenger},
    {path: '/signup/edit-info'},
    {path: '/main', component: mainVuetify},
    {path: '/log', component: loginVuetify},
    {path: '/users-vuetify', component: usersVuetify},
    {path: '/', component: helloVuetify}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = [
        '/users-vuetify',
        '/login',
        '/signup',
        '/signup/activate',
        '/log',
        '/'
    ]
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem('userToken')

    if(authRequired && !loggedIn){
        return next('/')
    }
    next()
})

export default router;