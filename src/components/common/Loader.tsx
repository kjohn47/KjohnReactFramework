import React, { useContext } from "react";
import { AppContext } from "../../common/config/appConfig";

interface ILoader {
    isLoading: boolean;
    bigLoader?: boolean;
    paddingTop?: boolean;
    withoutText?: boolean;
}

const Loader: React.FC<ILoader> = ( props ) => 
{
    const [appContext] = useContext(AppContext);

    return ( 
        <React.Fragment>
            { props.isLoading && 
                <div className = { props.paddingTop ? "LoadingDiv LoadingPadding" : "LoadingDiv"}>
                    <div className = { "LoaderSpinner LoadSpinnerColor" + ( props.bigLoader ? " BigSpinner" : "" ) }></div>
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