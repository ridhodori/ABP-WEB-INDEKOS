import { createContext, useState } from "react";

const LoginContext = createContext({});

export function LoginProvider({children}){
    const [login, setLogin] = useState(false);
    const [loggedUser, setLoggedUser] = useState('');
    
    return (
        <LoginContext.Provider value={{login, setLogin, loggedUser, setLoggedUser}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;