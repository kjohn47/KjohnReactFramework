import React, { useState } from 'react';
import Column from '../../common/Column';
import Row from '../../common/Row';
import Balloon, { BallonArrowEnum } from '../../common/Balloon';

const TestBalloon: React.FC = () => {
    const [balloon1, setBalloon1] = useState<boolean>(false);
    return (
        <Row>
            <Column>
                <Row>
                    <Column>
                        <br />
                        <Balloon>
                            <span>
                                This is a balloon
                            </span>
                            <br />
                            <span>
                                This is 2nd Line
                            </span>
                        </Balloon>
                    </Column>
                    <Column>
                        <br />
                        <Balloon Arrow={BallonArrowEnum.Top}>
                            <span>
                                This is a balloon with top arrow
                            </span>
                        </Balloon>
                    </Column>
                    <Column>
                        <br />
                        <Balloon Arrow={BallonArrowEnum.Bottom}>
                            <span>
                                This is a balloon with bottom arrow
                            </span>
                        </Balloon>
                    </Column>
                    <Column>
                        <br />
                        <Balloon Arrow={BallonArrowEnum.Left}>
                            <span>
                                This is a balloon with left arrow
                            </span>
                        </Balloon>
                    </Column>
                    <Column>
                        <br />
                        <Balloon Arrow={BallonArrowEnum.Right}>
                            <span>
                                This is a balloon with right arrow
                            </span>
                        </Balloon>
                    </Column>
                </Row>
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
                        <div style={{fontWeight: "bold", cursor: "pointer"}} onClick={() => setBalloon1(true)}>Click to Open Balloon</div>
                        <Balloon Close={() => setBalloon1(false)} IsFloating IsVisible={balloon1}>
                            <span>
                                This is a balloon with Close
                            </span>
                        </Balloon>
                    </Column>
                    <Column>
                        <br />
                        <Balloon Title="Title" Close={() => {}} IsFloating Arrow={BallonArrowEnum.Top} IsVisible>
                            <span>
                                This is a balloon with Title and Close
                            </span>
                        </Balloon>
                    </Column>
                </Row>
            </Column>
        </Row>
    );
}

export default TestBalloon;