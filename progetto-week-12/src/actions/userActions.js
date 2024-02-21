export const setUserToken = (token) => {
    console.log(token)
    return {
        type: "SET_TOKEN",
        payload: token
    }
}
export const setUserUsername = (username) => {
    console.log(username)
    return {
        type: "SET_USERNAME",
        payload: username
    }
}
export const setUserEmail = (email) => {
    console.log(email)
    return {
        type: "SET_EMAIL",
        payload: email
    }
}

export const setUserLogged = (logged) => {
    console.log(logged)
    return {
        type: "SET_LOGGED",
        payload: logged
    }
}
