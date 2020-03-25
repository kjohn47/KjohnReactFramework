import React from "react";
import { ILogin } from "../context/loginContextInterfaces";

export const withLogin = ( Component: React.ComponentType, loginData: ILogin | undefined = undefined ): React.ComponentType => {
    const WithLogin: React.FC = () => {
        return (
            loginData === undefined ?
                <div>Please make login</div>
                :
                <Component />
        );
    }

    return WithLogin;
}