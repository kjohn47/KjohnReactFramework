import React from "react";
import useTranslation from "../../common/context/pageText/getTranslation";

interface ILoader {
    isLoading: boolean;
    bigLoader?: boolean;
    paddingTop?: boolean;
    withoutText?: boolean;
}

const Loader: React.FC<ILoader> = ( props ) => {
    const { getTranslation } = useTranslation();

    return (
        <React.Fragment>
            { props.isLoading &&
                <div className={ props.paddingTop ? "LoadingDiv LoadingPadding" : "LoadingDiv" }>
                    <div className={ "LoaderSpinner LoadSpinnerColor" + ( props.bigLoader ? " BigSpinner" : "" ) }></div>
                    { !props.withoutText && <div className={ props.bigLoader ? "LoaderTextBig" : "LoaderText" }>
                        { getTranslation( "_generic", "#(loadingText)" ) }
                    </div> }
                </div> }
            <div className={ props.isLoading ? "contentLoading" : "" }>
                { props.children }
            </div>
        </React.Fragment>
    );
}

export default Loader;