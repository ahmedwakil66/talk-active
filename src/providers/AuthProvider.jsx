import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../../firebase.config";
import { baseUrl } from "../utilities/URLs";

export const AuthContext = new createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createAccount = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => signOut(auth);


    useEffect(() => {
        const unSub = onAuthStateChanged(auth, user => {
            setUser(user);

            //request for a jwt token
            if (user) {
                fetch(`${baseUrl}/jwt`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ user: { email: user.email } })
                })
                    .then(res => res.json())
                    .then(data => localStorage.setItem('talkActive-token', data.token))
            }
            else {
                localStorage.removeItem('talkActive-token');
            }

            //no more loading
            setLoading(false);
        })
        return unSub;
    }, [])


    const authInfo = {
        user,
        loading,
        createAccount,
        logIn,
        logOut,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;