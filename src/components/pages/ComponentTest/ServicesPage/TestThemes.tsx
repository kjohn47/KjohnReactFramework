import React from 'react';
import Column from '../../../common/structure/Column';
import Row from '../../../common/structure/Row';
import { AppGlobalTheme } from '../../../../logic/context/App/appContextEnums';
import Button, { ButtonTypes } from '../../../common/inputs/Button';
import FieldSet from '../../../common/presentation/wrapper/FieldSet';
import useAppHandler from '../../../../logic/context/App/AppContextHandler';

const TestThemes: React.FC = () => {
    const appContext = useAppHandler();

    const setTheme = ( theme: AppGlobalTheme ) => {
        appContext.ChangeTheme(theme)
    }

    const getThemeName = (theme: AppGlobalTheme) => {
        switch(theme) {
            case AppGlobalTheme.Red: {
                return "Red Theme";
            }
            case AppGlobalTheme.Green: {
                return "Green Theme";
            }
            case AppGlobalTheme.Blue: {
                return "Blue Theme";
            }
            case AppGlobalTheme.Orange: {
                return "Orange Theme";
            }
            case AppGlobalTheme.Grey: {
                return "Grey Theme";
            }
            case AppGlobalTheme.Pink: {
                return "Pink Theme";
            }
            default: {
                return "Default Theme";
            }
        }
    }

    return (
        <Row>
            <Column>
                <Row>
                    <Column>
                        <div>
                            <span style={{fontWeight:"bold"}}>Current Theme:</span><span> {getThemeName(appContext.App.globalTheme)}</span>
                        </div>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <FieldSet Title="Change theme on buttons bellow">
                            <Row>
                                <Column>
                                    <div style={{padding: "20px"}}>
                                        <Button onClick={() => {setTheme(AppGlobalTheme.Default)}}>
                                            Default
                                        </Button>
                                    </div>
                                </Column>
                                <Column>
                                    <div style={{padding: "20px"}}>
                                        <Button onClick={() => {setTheme(AppGlobalTheme.Red)}} buttonType={ButtonTypes.Danger}>
                                            Red
                                        </Button>
                                    </div>
                                </Column>
                                <Column>
                                    <div style={{padding: "20px"}}>
                                        <Button onClick={() => {setTheme(AppGlobalTheme.Green)}} buttonType={ButtonTypes.Confirmation}>
                                            Green
                                        </Button>
                                    </div>
                                </Column>
                                <Column>
                                    <div style={{padding: "20px"}}>
                                        <Button onClick={() => {setTheme(AppGlobalTheme.Blue)}} buttonType={ButtonTypes.Information}>
                                            Blue
                                        </Button>
                                    </div>
                                </Column>
                                <Column>
                                    <div style={{padding: "20px"}}>
                                        <Button onClick={() => {setTheme(AppGlobalTheme.Orange)}} buttonType={ButtonTypes.Warning}>
                                            Orange
                                        </Button>
                                    </div>
                                </Column>
                                <Column>
                                    <div style={{padding: "20px"}}>
                                        <Button onClick={() => {setTheme(AppGlobalTheme.Grey)}} buttonType={ButtonTypes.Cancelation}>
                                            Grey
                                        </Button>
                                    </div>
                                </Column>
                                <Column>
                                    <div style={{padding: "20px"}}>
                                        <Button onClick={() => {setTheme(AppGlobalTheme.Pink)}} buttonType={ButtonTypes.Default}>
                                            Pink
                                        </Button>
                                    </div>
                                </Column>
                            </Row>
                        </FieldSet>
                    </Column>
                </Row>
            </Column>
        </Row>
    )
}

export default TestThemes;