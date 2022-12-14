import {authHeader, refreshTokenHeader} from "@/headers/auth-header";
import axios from "axios";

export const userService = {
    login,
    logout,
    getAccessTokenForRefresh,
    refreshToken,
    //getAll
}

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload();
            } else if (response.status === 403) {
                // getAccessTokenForRefresh();
                refreshToken();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

function login(login, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({login, password})
    };
    // return fetch(`http://localhost:9000/api/auth/login`, requestOptions)
    return fetch(`http://192.168.137.77:9000/api/auth/login`, requestOptions)
        .then(handleResponse)
        .then(userToken => {
            console.log(userToken)
            if (userToken) {
                localStorage.setItem('userToken', JSON.stringify(userToken));
                localStorage.setItem('login', login)
            }
            return userToken;
        });
    // .then(user => {
    //     if(user.token){
    //         localStorage.setItem('token', JSON.stringify(user));
    //     }
    //     return user
    // });
}

function getAccessTokenForRefresh() {
    const requestOption = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({'refreshToken': JSON.parse(localStorage.getItem('userToken')).refreshToken})
    }

    return fetch(`http://192.168.137.77:9000/api/auth/token`, requestOption)
        .then(handleResponse)
        .then(tempToken => {
            if (tempToken) {
                localStorage.setItem('tempToken', JSON.stringify(tempToken));
                // this.$cookies.set('tempToken', JSON.stringify(tempToken))
            }
            return tempToken;
        }).then(refreshToken).then(location.reload)
}

// function refreshToken() {
//     const requestOption = {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json',
//             'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('tempToken')).accessToken
//         },
//         body: JSON.stringify({'refreshToken': JSON.parse(localStorage.getItem('userToken')).refreshToken})
//     }
//     return fetch(`http://localhost:9000/api/auth/refresh`, requestOption)
//         .then(handleResponse)
//         .then(userToken => {
//             if (userToken) {
//                 localStorage.removeItem('userToken');
//                 // this.$cookies.remove('userToken');
//                 localStorage.removeItem('tempToken');
//                 // this.$cookies.remove('tempToken');
//                 localStorage.setItem('userToken', JSON.stringify(userToken));
//                 // this.$cookies.set('userToken', JSON.stringify(userToken));
//                 location.reload();
//             }
//             return userToken;
//         })
// }

function refreshToken() {
    let userToken = JSON.parse(localStorage.getItem('userToken'))
    axios
        .post("http://192.168.137.77:9000/api/auth/token", {
            'refreshToken': userToken.refreshToken
        }).then(response=>{
            userToken.accessToken = response.data.accessToken
            localStorage.setItem('userToken', JSON.stringify(userToken))
    })
}

function logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('login')
    // this.$cookies.remove('userToken');
}


// function getAll(){
//     const requestOptions={
//         method:'GET',
//         headers: authHeader()
//     };
//
//     return fetch(`${config.apiUrl}/users`, requestOptions)
//         .then(handleResponse);
// }