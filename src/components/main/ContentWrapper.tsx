import React from 'react';

const ContentWrapper: React.FC = ({children}) => {
    return (
        <div className={ "PageContent PageContentColor" } >
            {children}
        </div>
    )
}

export default ContentWrapper;