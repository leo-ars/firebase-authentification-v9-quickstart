import React, { useContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentuser] = useState()
    const [loading, setLoading] = useState(true)
    
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout () {
        return signOut(auth)
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentuser(user)
            }
            setLoading(false)
        })
        return unsubscribe
    }, [])


    const value = {
        currentUser,
        signup,
        login,
        logout
    }

        return (
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        )
}
