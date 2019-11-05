import React, { useContext } from "react";
import { AppContext } from "../../common/config/appConfig";
import { AppGlobalTheme } from "../../common/context/appContextEnums";

interface ILoader {
    isLoading: boolean;
    bigLoader?: boolean;
    paddingTop?: boolean;
    withoutText?: boolean;
}

const getThemeCss: ( appTheme: AppGlobalTheme, bigSpinner?: boolean ) => string = ( appTheme, bigSpinner ) => {
    let bigSpinnerCss = bigSpinner? " BigSpinner" : ""
    switch( appTheme )
    {
        case AppGlobalTheme.Blue: 
            return " LoadSpinnerColor_Blue" + bigSpinnerCss;
        case AppGlobalTheme.Green: 
            return " LoadSpinnerColor_Green" + bigSpinnerCss;
        case AppGlobalTheme.Red: 
            return " LoadSpinnerColor_Red" + bigSpinnerCss;
        case AppGlobalTheme.Orange: 
            return " LoadSpinnerColor_Orange" + bigSpinnerCss;
        case AppGlobalTheme.Grey: 
            return " LoadSpinnerColor_Grey" + bigSpinnerCss;
        default:
            return " LoadSpinnerColor" + bigSpinnerCss;
    }
}

const Loader: React.FC<ILoader> = ( props ) => 
{
    const [appContext] = useContext(AppContext);
    let theme = getThemeCss( appContext.globalTheme, props.bigLoader );

    return ( 
        <React.Fragment>
            { props.isLoading && 
                <div className = { props.paddingTop ? "LoadingDiv LoadingPadding" : "LoadingDiv"}>
                    <div className = { "LoaderSpinner" + theme }></div>
                    { !props.withoutText && <div className = { props.bigLoader ? "LoaderTextBig" : "LoaderText" }>
                        {appContext.translations.loadingText}
                    </div> }
                </div> }
            <div className = { props.isLoading ? "contentLoading" : "" }>
                { props.children }
            </div>
        </React.Fragment>
    );
}

export default Loader;