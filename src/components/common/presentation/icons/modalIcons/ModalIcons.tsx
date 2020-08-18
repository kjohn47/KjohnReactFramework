import React from 'react';

export enum ModalIconEnum {
    Danger,
    Warning,
    Stop,
    Human,
    HumanGrp
}

const DangerSvg = React.lazy( () => import('./DangerIcon') );
const WarningSvg = React.lazy( () => import('./WarningIcon') );
const StopSvg = React.lazy( () => import('./StopIcon') );
const HumanSvg = React.lazy( () => import('./HumanIcon') );
const HumanGrpSvg = React.lazy( () => import('./HumanGrpIcon') );

export const ModalIcons = {
    [ModalIconEnum.Danger]: <DangerSvg />,
    [ModalIconEnum.Warning]: <WarningSvg />,
    [ModalIconEnum.Stop]: <StopSvg />,
    [ModalIconEnum.Human]: <HumanSvg />,
    [ModalIconEnum.HumanGrp]: <HumanGrpSvg />
}