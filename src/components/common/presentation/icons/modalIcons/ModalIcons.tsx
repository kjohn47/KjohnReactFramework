import React from 'react';

export enum ModalIconEnum {
    Danger,
    Warning,
    Stop
}

const DangerSvg = React.lazy( () => import('./DangerIcon') );
const WarningSvg = React.lazy( () => import('./WarningIcon') );

export const ModalIcons = {
    [ModalIconEnum.Danger]: <DangerSvg />,
    [ModalIconEnum.Warning]: <WarningSvg />,
    [ModalIconEnum.Stop]: <DangerSvg />
}