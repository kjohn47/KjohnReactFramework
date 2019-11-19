import React, { useContext } from "react";
import { LoginContext } from "../config/appConfig";

export const withLogin = ( Component: React.ComponentType ): React.ComponentType => {
    const WithLogin: React.FC = () => {
        const [ loginContext ] = useContext( LoginContext );
        return (
            loginContext === undefined ?
                <div>Please make login</div>
                :
                <Component />
        );
    }

    return WithLogin;
}