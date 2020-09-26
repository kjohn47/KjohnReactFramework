import React, { useMemo } from "react";
import { KnownPages } from "../../logic/context/Routes/routeContextEnums";
import Button from "../common/inputs/Button";
import WithTooltip, { ToolTipPosition } from "../common/presentation/wrapper/WithTooltip";
import PageHeader from "../common/presentation/display/PageHeader";
import Row from "../common/structure/Row";
import Column from "../common/structure/Column";
import useTranslation from "../../logic/functions/getTranslation";
import useErrorTranslation from "../../logic/functions/getPageError";
import { showDetailedErrors } from "../../logic/config/configuration";
import useAppHandler from "../../logic/context/App/AppContextHandler";
import useErrorHandler from "../../logic/context/Error/ErrorContextHandler";

const ErrorPage: React.FC = () => {
    const { getTranslation } = useTranslation();
    const { getErrorData } = useErrorTranslation();
    const errorContext = useErrorHandler().Error;
    const appContext = useAppHandler().App;

    const errorInfo = useMemo(() => {
        return getErrorData( errorContext.errorCode );
    }, [getErrorData, errorContext.errorCode]);

    const showDetails = showDetailedErrors || appContext.adminOptions;
    return (
        <Row className="ErrorPage">
            <Column>
                <PageHeader className="ErrorPageHeader">
                    { errorInfo.Title }
                </PageHeader>
                <Row className={ "ErrorPageDescription" + ( showDetails ? "" : " ErrorPageDescriptionFull" ) }>
                    <Column>
                        { errorInfo.Message }
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