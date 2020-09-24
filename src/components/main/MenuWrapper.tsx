import React from 'react';

const MenuWrapper: React.FC<{IsCustom: Boolean}> = ({IsCustom, children}) => {
    return (
        <div className={ !IsCustom ? "PageMenu PageMenuColor" : "" }>
            {children}
        </div>
    )
}

export default MenuWrapper;