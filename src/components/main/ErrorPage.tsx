import React, { useContext, useEffect, useState } from "react";
import { ErrorContext, AppContext } from "../../common/config/appConfig";
import { IErrorData } from "../../common/context/appErrorInterfaces";
import { KnownPages } from "../../common/context/appContextEnums";
import { ErrorActions, ErrorCodes } from "../../common/context/appErrorEnums";
import { getTranslatedError } from "../../common/context/pageErrors/pageErrors";
import Button from "../common/Button";
import WithTooltip, { ToolTipPosition } from "../common/WithTooltip";

const ErrorPage: React.FC = () => {
    const [appContext] = useContext( AppContext );
    const appLanguage = appContext.globalLanguage;
    const [errorContext, setErrorContext] = useContext(ErrorContext);
    const [firstLoad, setFirstLoad] = useState(true);
    let errorData = ( errorContext.errorData !== undefined && errorContext.errorData ) as IErrorData;

    useEffect( () => {
        if( !firstLoad )
        {
            let errorMessage = errorData.errorMessage;
            let translatedErrorData = getTranslatedError( errorContext.errorCode as ErrorCodes, appLanguage );
            translatedErrorData.errorMessage = errorMessage;
            setErrorContext( {
                type: ErrorActions.ChangeErrorLanguage,
                errorData: translatedErrorData
            } );
        }
        else
        {
            setFirstLoad( false );
        }
        // eslint-disable-next-line
    }, [appLanguage] );

    return (
        <div className = "ErrorPage">
            <div className = "ErrorPageHeader">
                <h1>{errorData.errorTitle}</h1>
            </div>            
            <div className = "ErrorPageDescription">
                {errorData.errorDescription}
            </div>
            <div className = "ErrorPageFooter">
                { errorContext.errorCode !== undefined && "[" + errorContext.errorCode + "]: " + errorData.errorMessage }
            </div>            
            <div className = "ErrorPageRedirect">
                <WithTooltip toolTipText = { appContext.translations.goBackToHomeToolTip } toolTipPosition = { ToolTipPosition.Bottom }>
                    <Button page = { KnownPages.Home } >{ appContext.translations.goBackToHome }</Button>
                </WithTooltip>
            </div>
        </div>
    );
}

export default ErrorPage;