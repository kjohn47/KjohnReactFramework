import React, { useState, CSSProperties } from 'react';
import Column from '../../../common/Column';
import Row from '../../../common/Row';
import Balloon, { BallonArrowEnum, BalloonColorEnum } from '../../../common/Balloon';
import FieldSet from '../../../common/FieldSet';

const TestBalloon: React.FC = () => {
    const [balloon1, setBalloon1] = useState<boolean>(true);
    const [balloon2, setBalloon2] = useState<boolean>(true);
    const [balloon3, setBalloon3] = useState<boolean>(false);
    const [balloon4, setBalloon4] = useState<boolean>(false);
    const [balloon5, setBalloon5] = useState<boolean>(false);
    const [balloon6, setBalloon6] = useState<boolean>(false);

    const commonStyle: CSSProperties = {fontWeight: "bold", cursor: "pointer", marginTop:"-20px"};

    return (
        <Row>
            <Column>
                <Row>
                    <Column>
                        <br />
                        <FieldSet Title="Balloons">
                            <Row>
                                <Column>
                                    <br />
                                    <Balloon>
                                        <span>
                                            This is a balloon
                                        </span>
                                        <br />
                                        <span>
                                            This is base color
                                        </span>
                                    </Balloon>
                                </Column>
                                <Column>
                                    <br />
                                    <Balloon Color={BalloonColorEnum.Default}>
                                        <span>
                                            This is a balloon
                                        </span>
                                        <br />
                                        <span>
                                            This is default color
                                        </span>
                                    </Balloon>
                                </Column>
                                <Column>
                                    <br />
                                    <Balloon Color={BalloonColorEnum.Danger}>
                                        <span>
                                            This is a balloon
                                        </span>
                                        <br />
                                        <span>
                                            This is danger color
                                        </span>
                                    </Balloon>
                                </Column>
                                <Column>
                                    <br />
                                    <Balloon Color={BalloonColorEnum.Warning}>
                                        <span>
                                            This is a balloon
                                        </span>
                                        <br />
                                        <span>
                                            This is warning color
                                        </span>
                                    </Balloon>
                                </Column>
                                <Column>
                                    <br />
                                    <Balloon Color={BalloonColorEnum.Information}>
                                        <span>
                                            This is a balloon
                                        </span>
                                        <br />
                                        <span>
                                            This is information color
                                        </span>
                                    </Balloon>
                                </Column>
                                <Column>
                                    <br />
                                    <Balloon Color={BalloonColorEnum.Confirmation}>
                                        <span>
                                            This is a balloon
                                        </span>
                                        <br />
                                        <span>
                                            This is confirmation color
                                        </span>
                                    </Balloon>
                                </Column>
                                <Column>
                                    <br />
                                    <Balloon Color={BalloonColorEnum.Cancelation}>
                                        <span>
                                            This is a balloon
                                        </span>
                                        <br />
                                        <span>
                                            This is cancelation color
                                        </span>
                                    </Balloon>
                                </Column>
                                <Column />
                                <Column />
                                <Column />
                            </Row>
                        </FieldSet>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <FieldSet Title="Arrow Base Balloon">
                            <Row>
                            <Column>
                                <br />
                                <Balloon Arrow={BallonArrowEnum.Top}>
                                    <span>
                                        This is a balloon with top arrow
                                        <br />
                                    </span>
                                </Balloon>
                            </Column>
                            <Column>
                                <br />
                                <Balloon Arrow={BallonArrowEnum.Bottom}>
                                    <span>
                                        This is a balloon with bottom arrow
                                        <br />
                                    </span>
                                </Balloon>
                            </Column>
                            <Column>
                                <br />
                                <Balloon Arrow={BallonArrowEnum.Left}>
                                    <span>
                                        This is a balloon with left arrow
                                        <br />
                                    </span>
                                </Balloon>
                            </Column>
                            <Column>
                                <br />
                                <Balloon Arrow={BallonArrowEnum.Right}>
                                    <span>
                                        This is a balloon with right arrow
                                        <br />
                                    </span>
                                </Balloon>
                            </Column>
                            </Row>
                        </FieldSet>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <FieldSet Title="Balloon with Close/Title">
                            <Row>
                                <Column>
                                    <br />
                                    <Balloon Title="Title">
                                        <span>
                                            This is a balloon with title
                                        </span>
                                    </Balloon>
                                </Column>
                                <Column>
                                    <br />
                                    <div style={commonStyle} onClick={() => setBalloon1(true)}>Click to Open Closable Balloon</div>
                                    <Balloon Close={() => setBalloon1(false)} IsFloating IsVisible={balloon1}>
                                        <span>
                                            This is a balloon with Close
                                        </span>
                                    </Balloon>
                                </Column>
                                <Column>
                                    <br />
                                    <div style={commonStyle} onClick={() => setBalloon2(true)}>Click to Open Closable Balloon With Title</div>
                                    <Balloon Title="Title" Close={() => setBalloon2(false)} IsFloating IsVisible={balloon2}>
                                        <span>
                                            This is a balloon with Title and Close
                                        </span>
                                    </Balloon>
                                </Column>
                            </Row>
                        </FieldSet>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <FieldSet Title="Closeable Balloons with arrow">
                            <Row>
                                <Column>
                                    <br />
                                    <div style={commonStyle} onClick={() => setBalloon3(true)}>Click to Open Balloon Bottom</div>
                                    <Balloon Title="Top Arrow" Close={() => setBalloon3(false)} IsFloating Arrow={BallonArrowEnum.Top} IsVisible={balloon3}>
                                        <span>
                                            This Balloon appears bellow text
                                        </span>
                                    </Balloon>
                                </Column>
                                <Column>
                                    <Balloon Title="Bottom Arrow" Close={() => setBalloon4(false)} IsFloating Arrow={BallonArrowEnum.Bottom} IsVisible={balloon4}>
                                        <span>
                                            This Balloon appears on top of text
                                        </span>
                                    </Balloon>
                                    <br />
                                    <div style={commonStyle} onClick={() => setBalloon4(true)}>Click to Open Balloon Top</div>
                                </Column>
                                <Column>
                                    <div><span style={commonStyle} onClick={() => setBalloon5(true)}>Click to Open Balloon Right</span>
                                        <Balloon Title="Left Arrow" Close={() => setBalloon5(false)} IsFloating Arrow={BallonArrowEnum.Left} IsVisible={balloon5}>
                                            <span>
                                                This Balloon appears on right of text
                                            </span>
                                        </Balloon>
                                    </div>
                                </Column>
                                <Column>
                                    <div>
                                        <Balloon Title="Right Arrow" Close={() => setBalloon6(false)} IsFloating Arrow={BallonArrowEnum.Right} IsVisible={balloon6}>
                                            <span>
                                                This Balloon appears on left of text
                                            </span>
                                        </Balloon>
                                        <span style={commonStyle} onClick={() => setBalloon6(true)}>Click to Open Balloon Left</span>
                                    </div>
                                </Column>
                            </Row>
                        </FieldSet>
                    </Column>
                </Row>
            </Column>
        </Row>
    );
}

export default TestBalloon;