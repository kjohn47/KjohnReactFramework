import React, { useState, useEffect } from 'react';
import { useWindowHeight } from '../../logic/functions/windowResize';
import { minHeight } from '../../logic/config/configuration';

const FooterWrapper: React.FC<{IsCustom: Boolean}> = ({IsCustom, children}) => {
    const height = useWindowHeight();
    const [notFixed, setNotFixed] = useState<Boolean>(height <= minHeight);

    useEffect(() => {
        if(!IsCustom)
        {
            if(height <= minHeight)
            {
                setNotFixed(true);
            }
            else
            {
                setNotFixed(false);
            }
        }
    }, [height, IsCustom])

    return (
        <div className={ !IsCustom ? ("PageFooter PageMenuColor" + (notFixed ? "" : " FixedFooter")) : "" }>
            {children}
        </div>
    )
}

export default FooterWrapper;