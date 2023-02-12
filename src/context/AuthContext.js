import { createContext } from 'react'

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    login: (email, password) => {},
    fbLogin: (userid, name, token, profilePicture) => {},
    logout: () => {}
})
