import { createContext, useEffect, useReducer } from 'react'

import { createAction } from '../utils/firebase/reducer/reducer.utils';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils'

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,

});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
} 

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state, action) => {
    const { type, payload } = action;
    
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER :
            return {
                ...state,
                currentUser : payload
            }
        default:
            throw new Error(`unhandled type ${type} in the userReducer`);
    }
}


export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [ { currentUser } , dispatch] = useReducer(userReducer, INITIAL_STATE);
    console.log(currentUser)

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }

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

