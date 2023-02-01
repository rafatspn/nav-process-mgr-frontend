import { createContext } from 'react'

export const AuthContext = createContext({
    isLoggedIn: false,
    login: (email, password) => {},
    fbLogin: (userid, name, token, profilePicture) => {},
    logout: () => {}
})
