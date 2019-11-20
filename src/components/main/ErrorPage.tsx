import React, { useContext } from "react";
import { ErrorContext, AppContext } from "../../common/config/appConfig";
import { KnownPages } from "../../common/context/appContextEnums";
import Button from "../common/Button";
import WithTooltip, { ToolTipPosition } from "../common/WithTooltip";
import PageHeader from "../common/PageHeader";
import Row from "../common/Row";
import Column from "../common/Column";
import useTranslation from "../../common/context/pageText/getTranslation";
import useErrorTranslation from "../../common/context/pageErrors/getPageError";
import { showDetailedErrors } from "../../common/config/configuration";

const ErrorPage: React.FC = () => {
    const { getTranslation } = useTranslation();
    const { getErrorData } = useErrorTranslation();
    const [ errorContext ] = useContext( ErrorContext );
    const [ appContext ] = useContext( AppContext );
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
                            <Button page={ KnownPages.Home } >{ getTranslation( "_generic", "#(goBackToHome)" ) }</Button>
                        </WithTooltip>
                    </Column>
                </Row>
            </Column>
        </Row>
    );
}

export default ErrorPage;