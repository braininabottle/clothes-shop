import { createContext, useState, useEffect } from 'react'

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils'

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,

});


export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value =  { currentUser, setCurrentUser };  // generar el valor que será un objeto que pase los dos valores que son importantes, que es el user y el setUser.

    useEffect(()=>{

        const unsubscribe = onAuthStateChangedListener ((user) => {
        if(user){
            createUserDocumentFromAuth(user);
        }
            setCurrentUser(user);
        });
    
        return unsubscribe

    },[]);
    

    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}

