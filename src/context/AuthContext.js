import { createContext } from 'react'

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    pageId: null,
    login: (email, password) => {},
    fbLogin: (userid, name, token, profilePicture) => {},
    logout: () => {}
})
