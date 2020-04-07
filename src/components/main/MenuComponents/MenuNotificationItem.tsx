import React from 'react';
import DotsLoader, { DotsLoaderSize, DotsLoaderColor, DotsLoaderNrBall } from '../../common/DotsLoader';

interface IMenuNotificationItem {
    IsViewed?: boolean;
    DeleteItem?: () => void;
    Loading?: boolean;
}

const MenuNotificationItem: React.FC<IMenuNotificationItem> = ({IsViewed, DeleteItem, Loading, children}) => {
    return (
        <div className={"NotificationItem" + (!IsViewed ? " NotificationItemNew" : "")}>
            <div className={"NotificationItemText" + ( DeleteItem ? " NotificationItemTextDel" : "" ) }>
                {children}
            </div>
            <div className="NotificationItemDel">
                {DeleteItem && ( Loading ? 
                    <DotsLoader Size={DotsLoaderSize.Small} Color={DotsLoaderColor.Grey} DotsNumber={DotsLoaderNrBall.Three}/>
                    : <span className="NotificationItemCross pointer_cursor" onClick={()=>{ DeleteItem() }}>X</span>
                )}
            </div>
        </div>
    )
}

export default MenuNotificationItem;