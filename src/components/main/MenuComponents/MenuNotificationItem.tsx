import React, { useState } from 'react';
import DotsLoader, { DotsLoaderSize, DotsLoaderColor, DotsLoaderNrBall } from '../../common/DotsLoader';

interface IMenuNotificationItem {
    IsViewed?: boolean;
    DeleteItem?: () => void;
    Loading?: boolean;
}

const MenuNotificationItem: React.FC<IMenuNotificationItem> = ({IsViewed, DeleteItem, Loading, children}) => {
    const[isDeleting, setIsDeleting] = useState<boolean>(false);
    return (
        <div className={"NotificationItem" + (!IsViewed ? " NotificationItemNew" : "")}>
            <div className={"NotificationItemText" + ( DeleteItem ? " NotificationItemTextDel" : "" ) }>
                {children}
            </div>
            <div className="NotificationItemDel">
                {DeleteItem && ( (Loading && isDeleting) ? 
                    <DotsLoader Size={DotsLoaderSize.Small} Color={DotsLoaderColor.Grey} DotsNumber={DotsLoaderNrBall.Three}/>
                    : !Loading && <span className="NotificationItemCross pointer_cursor" onClick={()=>{ setIsDeleting(true); DeleteItem(); }}>X</span>
                )}
            </div>
        </div>
    )
}

export default MenuNotificationItem;