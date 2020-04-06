import React from 'react';

interface IMenuNotificationItem {
    IsViewed?: boolean;
    DeleteItem?: () => void;
}

const MenuNotificationItem: React.FC<IMenuNotificationItem> = ({IsViewed, DeleteItem, children}) => {
    return (
        <div className={"NotificationItem" + (!IsViewed ? " NotificationItemNew" : "")}>
            <div className={"NotificationItemText" + ( DeleteItem ? " NotificationItemTextDel" : "" ) }>
                {children}
            </div>
            <div className="NotificationItemDel">
                {DeleteItem && <span className="NotificationItemCross pointer_cursor" onClick={()=>{ DeleteItem() }}>X</span>}
            </div>
        </div>
    )
}

export default MenuNotificationItem;