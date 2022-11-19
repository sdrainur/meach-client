import {userService} from '@/services/user-service';
import router from '../router/router';

const user = JSON.parse(localStorage.getItem('userToken'))
const initialState = user
    ? {status: {loggedIn: true}, user}
    : {status: {}, user: null}

const authenticatedLogin = localStorage.getItem('login')

export const authentication = {
    namespaced: true,
    state: {
        initialState,
        authenticatedLogin
    },
    actions: {
        login({dispatch, commit}, {login, password}) {
            commit('loginRequest', {login});
            userService.login(login, password)
                .then(
                    user => {
                        commit('loginSuccess', user);
                        commit('addAuthenticatedLogin', login)
                        router.push('/messenger');
                    },
                    error => {
                        commit('loginFailure', error);
                        dispatch('alert/error', error, {root: true});
                    }
                );
        },
        logout({commit}) {
            userService.logout()
            commit('logout')
        },
        getAccessTokenForRefresh({commit}) {
            userService.getAccessTokenForRefresh()
            commit('getAccessTokenForRefresh')
        },
        refreshToken({commit}) {
            userService.refreshToken()
            commit('refreshToken')
        }
    },
    mutations: {
        addAuthenticatedLogin(state, login)
        {
          state.authenticatedLogin=login
        },
        loginRequest(state, user) {
            state.status = {loggingIn: true}
            state.user = user
        },
        loginSuccess(state, user) {
            state.status = {loggedIn: true}
            state.user = user
        },
        loginFailure(state) {
            state.status = {}
            state.authenticatedLogin=null
            state.user = null
        },
        logout(state) {
            state.status = {}
            state.authenticatedLogin=null
            state.user = null
        },
        getAccessTokenForRefresh(state) {
            state.status = {loggingIn: true}
        },
        refreshToken(state) {
            state.status = {loggingIn: true}
        }
    },
    getters:{
        getAuthenticatedLogin(state){
            return state.authenticatedLogin
        }
    }
}