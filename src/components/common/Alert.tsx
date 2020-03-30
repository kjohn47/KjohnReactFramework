import React from 'react';
import Column from './Column';
import Row from './Row';

export enum AlertColorEnum {
    Danger = "Danger",
    Information = "Information",
    Confirmation = "Confirmation",
    Warning = "Warning",
    Cancelation = "Cancelation",
    Default = "Default"
}

interface IAlertProps {
    IsVisible: boolean;
    Close?: () => void;
    Color?: AlertColorEnum;
}

const Alert: React.FC<IAlertProps> = (props) => {
    return (
        props.IsVisible ? <Row className="AlertComponent">
            <Column className={"Alert Alert_" + (props.Color ? props.Color : AlertColorEnum.Default)}>
                <div>
                    <div className={(props.Close? "AlertCloseable" : "")}>
                        {props.children}
                    </div>
                    {props.Close && <div className="AlertCloseDiv">
                        <span className="AlertClose pointer_cursor" onClick={()=> props.Close && props.Close()}>
                            X
                        </span>
                    </div>}
                </div>
            </Column>
        </Row> : null
    );
}

export default Alert;