import React, { useContext } from "react";
import { AppContext, ErrorContext, LoadingContext } from "../../common/config/appConfig";
import { KnownPages } from "../../common/context/appContextEnums";
import { ErrorCodes, ErrorActions } from "../../common/context/appErrorEnums";
import Loader from "../common/Loader";
import { getKnownPage } from "../../common/functions/getKnownPage";

const PageHandler: React.FC = () => {
    const [ appContext ] = useContext( AppContext );
    const [ errorContext, setErrorContext ] = useContext( ErrorContext );
    const isLoading = useContext( LoadingContext )[ 0 ];
    let selectedPage = errorContext.hasError ? KnownPages.Error : appContext.selectedPage;

    let Output: React.ComponentType | undefined;

    Output = getKnownPage( selectedPage );

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