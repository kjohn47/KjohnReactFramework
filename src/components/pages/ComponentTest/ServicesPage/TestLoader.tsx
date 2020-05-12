import React, { CSSProperties } from 'react';
import Row from '../../../common/structure/Row';
import Column from '../../../common/structure/Column';
import Loader from '../../../common/presentation/loading/Loader';
import FieldSet from '../../../common/presentation/wrapper/FieldSet';
import DotsLoader, { DotsLoaderSize, DotsLoaderNrBall, DotsLoaderColor } from '../../../common/presentation/loading/DotsLoader';
import CircleProgressBar, { CPBSize } from '../../../common/presentation/loading/CircleProgressBar';

const TestLoader: React.FC = () => {
    const dotLoaderStyle: CSSProperties = {
        margin: '10px',
        padding: '20px',
        minWidth: '100px',
        backgroundColor: 'white'
    }
    return (
        <Row>
            <Column>
                <FieldSet Title="Circle Loader">
                    <Row>
                        <Column>
                            <Loader isLoading bigLoader paddingTop/>
                        </Column>
                        <Column>
                            <Loader isLoading bigLoader withoutText paddingTop/>
                        </Column>
                        <Column>
                            <Loader isLoading paddingTop/>
                        </Column>
                        <Column>
                            <Loader isLoading withoutText paddingTop/>
                        </Column>
                    </Row>
                </FieldSet>
                <FieldSet Title="Dot Loader">
                    <Row>
                        <Column>
                            <div style={dotLoaderStyle}>
                                <DotsLoader Size={DotsLoaderSize.Small} DotsNumber= {DotsLoaderNrBall.Three}/>
                            </div>
                        </Column>
                        <Column>
                            <div style={dotLoaderStyle}>
                                <DotsLoader Size={DotsLoaderSize.Medium} DotsNumber= {DotsLoaderNrBall.Three}/>
                            </div>
                        </Column>
                        <Column>
                            <div style={dotLoaderStyle}>
                                <DotsLoader Size={DotsLoaderSize.Big} DotsNumber= {DotsLoaderNrBall.Three}/>
                            </div>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <div style={dotLoaderStyle}>
                                <DotsLoader Size={DotsLoaderSize.Medium} DotsNumber= {DotsLoaderNrBall.One}/>
                            </div>
                        </Column>
                        <Column>
                            <div style={dotLoaderStyle}>
                                <DotsLoader Size={DotsLoaderSize.Medium} DotsNumber= {DotsLoaderNrBall.Two}/>
                            </div>
                        </Column>
                        <Column>
                            <div style={dotLoaderStyle}>
                                <DotsLoader Size={DotsLoaderSize.Medium} DotsNumber= {DotsLoaderNrBall.Three} Color={DotsLoaderColor.Grey}/>
                            </div>
                        </Column>
                    </Row>
                </FieldSet>
                <FieldSet Title="Circular Progress Bar">
                    <Row>
                        <Column>
                            <CircleProgressBar 
                                size = { CPBSize.Small }
                                progress = { 25 }
                            />
                        </Column>
                        <Column>
                            <CircleProgressBar 
                                size = { CPBSize.Medium }
                                progress = { 50 }
                            />
                        </Column>
                        <Column>
                            <CircleProgressBar 
                                size = { CPBSize.Big }
                                progress = { 75 }
                            />
                        </Column>
                    </Row>
                </FieldSet>
            </Column>
        </Row>
        
    )
}

export default TestLoader;