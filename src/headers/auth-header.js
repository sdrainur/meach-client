export function authHeader() {
    let userToken = JSON.parse(localStorage.getItem('userToken')).accessToken

    if (userToken) {
        return {
            'Authorization': 'Bearer ' + userToken
        }
    } else {
        return {}
    }
}

export function refreshTokenHeader(){
    let userData = JSON.parse(localStorage.getItem('userToken'));

    if(userData){
        return{
            'Authorization': 'Bearer ' + userData.refreshToken
        }
    } else {
        return {}
    }
}