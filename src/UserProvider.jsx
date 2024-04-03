import React, {useEffect, useState} from 'react'
import {UserContext} from './UserContext'

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        // Check if user is already logged in by looking for a token in sessionstorage.
        const savedUser = sessionStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        // Save user to sessionstorage when user state changes
        if (user){
        sessionStorage.setItem('user', JSON.stringify(user));
        }
        else{
            sessionStorage.removeItem('user');
        }
    }, [user]);
    
      return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
            </UserContext.Provider>
    );
};