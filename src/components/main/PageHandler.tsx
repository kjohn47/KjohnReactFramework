import React, { useContext } from "react";
import { AppContext, ErrorContext, LoadingContext } from "../../common/config/appConfig";
import { KnownPages } from "../../common/context/appContextEnums";
import { ErrorCodes, ErrorActions } from "../../common/context/appErrorEnums";
import Loader from "../common/Loader";
import ErrorPage from "./ErrorPage";
import { injectProps } from "../../common/functions/misc";

interface IRoure<TRouteProps> {
    Route: string;
    Component: React.ComponentType;
    Props?: TRouteProps;
}

export interface IPageHandleProps {
    Routes: {
        Home: {
            Component: React.ComponentType;
            Props?: any;
        };
        KnownRoutes?: IRoure<any>[];
    };
}

const PageHandler: React.FC<IPageHandleProps> = ({Routes}) => {
    const [ appContext ] = useContext( AppContext );
    const [ errorContext, setErrorContext ] = useContext( ErrorContext );
    const isLoading = useContext( LoadingContext )[ 0 ];
    let selectedPage = errorContext.hasError ? KnownPages.Error : appContext.selectedPage;

    let Output: React.ComponentType | undefined;

    if( selectedPage.toLowerCase() === KnownPages.Home.toLowerCase() )
    {
        Output = injectProps( Routes.Home.Component, Routes.Home.Props );        
    }
    else if( selectedPage.toLowerCase() === KnownPages.Error.toLowerCase())
    {
        Output = ErrorPage;
    }
    else
    {
        let route = Routes.KnownRoutes && Routes.KnownRoutes.filter( r => r.Route.toLowerCase() === selectedPage.toLowerCase() )[0];        
        if( route )
        {
            Output = injectProps( route.Component, route.Props );
        }
    }
    
    //getKnownPage( selectedPage );

    if ( Output === undefined ) {
        setErrorContext( {
            type: ErrorActions.ActivateError,
            errorCode: ErrorCodes.PageNotFound,
            errorDescription: "Not Found: 404"
        } );
    }

    return (
        <Loader isLoading={ isLoading } bigLoader paddingTop >
            { Output && <Output /> }
        </Loader>
    );
}

export default PageHandler;