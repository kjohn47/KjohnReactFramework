import React from 'react';

const MenuNotification: React.FC<{reference: any}> = ({reference}) => {
    
    return (
            <div ref={reference} className="MenuNotifications" style ={{
                padding: '5px',
                border: '1px solid black',
                borderRadius: '100%',
                fontSize: 'small',
                minWidth: '30px'
            }}>
                10
            </div>
    )
}

export default MenuNotification;