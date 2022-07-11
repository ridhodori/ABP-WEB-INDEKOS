import { createContext, useState } from "react";

const LoginContext = createContext({});

export function LoginProvider({children}){
    const [login, setLogin] = useState(false);
    const [loggedUser, setLoggedUser] = useState('');
    const [profile, setProfile] = useState({});
    
    return (
        <LoginContext.Provider value={{login, setLogin, loggedUser, setLoggedUser, profile, setProfile}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;