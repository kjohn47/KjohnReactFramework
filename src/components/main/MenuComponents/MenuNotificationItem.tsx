import React, { useState } from 'react';
import { executeClickEnterSpace } from '../../../logic/functions/misc';
import DotsLoader, { DotsLoaderSize, DotsLoaderColor, DotsLoaderNrBall } from '../../common/presentation/loading/DotsLoader';

interface IMenuNotificationItem {
    IsViewed?: boolean;
    DeleteItem?: () => void;
    Loading?: boolean;
    TabIndex?: number;
}

const MenuNotificationItem: React.FC<IMenuNotificationItem> = ({IsViewed, DeleteItem, Loading, children, TabIndex}) => {
    const[isDeleting, setIsDeleting] = useState<boolean>(false);
    return (
        <div className={"NotificationItem" + (!IsViewed ? " NotificationItemNew" : "")}>
            <div tabIndex={TabIndex} className={"NotificationItemText" + ( DeleteItem ? " NotificationItemTextDel" : "" ) }>
                {children}
            </div>
            <div className="NotificationItemDel">
                {DeleteItem && ( (Loading && isDeleting) ? 
                    <DotsLoader Size={DotsLoaderSize.Small} Color={DotsLoaderColor.Grey} DotsNumber={DotsLoaderNrBall.Three}/>
                    : !Loading && <span 
                                    tabIndex= {0} 
                                    className="NotificationItemCross pointer_cursor" 
                                    onClick={()=>{ setIsDeleting(true); DeleteItem(); }}
                                    onKeyDown={(e) => executeClickEnterSpace(e, ()=>{ 
                                                                                setIsDeleting(true);
                                                                                DeleteItem(); 
                                                                            })}
                                >X</span>
                )}
            </div>
        </div>
    )
}

export default MenuNotificationItem;