import React from 'react';

export enum ModalIconEnum {
    Danger,
    Warning,
    Stop
}

const DangerSvg = React.lazy( () => import('./DangerIcon') );

export const ModalIcons = {
    [ModalIconEnum.Danger]: <DangerSvg />
}