import React from 'react';

export enum ModalIconEnum {
    Danger,
    Warning,
    Stop,
    Forbidden,
    Error,
    Human,
    HumanGrp,
    Cookie
}

const DangerSvg = React.lazy( () => import('./DangerIcon') );
const WarningSvg = React.lazy( () => import('./WarningIcon') );
const StopSvg = React.lazy( () => import('./StopIcon') );
const ForbiddenSvg = React.lazy( () => import('./ForbiddenIcon') );
const ErrorSvg = React.lazy( () => import('./ErrorIcon') );
const HumanSvg = React.lazy( () => import('./HumanIcon') );
const HumanGrpSvg = React.lazy( () => import('./HumanGrpIcon') );
const CookieSvg = React.lazy( () => import('./CookieIcon') );

export const ModalIcons = {
    [ModalIconEnum.Danger]: <DangerSvg />,
    [ModalIconEnum.Warning]: <WarningSvg />,
    [ModalIconEnum.Stop]: <StopSvg />,
    [ModalIconEnum.Forbidden]: <ForbiddenSvg />,
    [ModalIconEnum.Error]: <ErrorSvg />,
    [ModalIconEnum.Human]: <HumanSvg />,
    [ModalIconEnum.HumanGrp]: <HumanGrpSvg />,
    [ModalIconEnum.Cookie]: <CookieSvg />
}