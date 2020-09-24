import React from 'react';
import { useMinimalHeight } from '../../logic/functions/windowResize';

const FooterWrapper: React.FC<{IsCustom: Boolean}> = ({IsCustom, children}) => {
    const notFixed = useMinimalHeight();

    return (
        <div className={ !IsCustom ? ("PageFooter PageMenuColor" + (notFixed ? "" : " FixedFooter")) : "" }>
            {children}
        </div>
    )
}

export default FooterWrapper;