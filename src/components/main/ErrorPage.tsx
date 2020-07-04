import React, { useContext } from "react";
import { ErrorContext, AppContext } from "../../logic/config/AppProvider";
import { KnownPages } from "../../logic/context/Routes/routeContextEnums";
import Button from "../common/inputs/Button";
import WithTooltip, { ToolTipPosition } from "../common/presentation/wrapper/WithTooltip";
import PageHeader from "../common/presentation/display/PageHeader";
import Row from "../common/structure/Row";
import Column from "../common/structure/Column";
import useTranslation from "../../logic/functions/getTranslation";
import useErrorTranslation from "../../logic/functions/getPageError";
import { showDetailedErrors } from "../../logic/config/configuration";

const ErrorPage: React.FC = () => {
    const { getTranslation } = useTranslation();
    const { getErrorData } = useErrorTranslation();
    const [ errorContext ] = useContext( ErrorContext );
    const appContext = useContext( AppContext ).App;
    const showDetails = showDetailedErrors || appContext.adminOptions;
    return (
        <Row className="ErrorPage">
            <Column>
                <PageHeader className="ErrorPageHeader">
                    { getErrorData( errorContext.errorCode ).Title }
                </PageHeader>
                <Row className={ "ErrorPageDescription" + ( showDetails ? "" : " ErrorPageDescriptionFull" ) }>
                    <Column>
                        { getErrorData( errorContext.errorCode ).Message }
                    </Column>
                </Row>
                { showDetails &&
                    <Row className="ErrorPageFooter">
                        <Column>
                            { `[${ errorContext.errorCode }]: ${ errorContext.errorDescription }` }
                        </Column>
                    </Row> }
                <Row className="ErrorPageRedirect">
                    <Column>
                        <WithTooltip toolTipText={ getTranslation( "_generic", "#(goBackToHomeToolTip)" ) } toolTipPosition={ ToolTipPosition.Bottom } className="ErrorPageReturnTooltip">
                            <Button page={ KnownPages.Home } forceReload >{ getTranslation( "_generic", "#(goBackToHome)" ) }</Button>
                        </WithTooltip>
                    </Column>
                </Row>
            </Column>
        </Row>
    );
}

export default ErrorPage;