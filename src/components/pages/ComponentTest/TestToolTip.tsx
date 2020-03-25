import React, { CSSProperties } from 'react';
import Column from '../../common/Column';
import Row from '../../common/Row';
import WithTooltip, { ToolTipColor, ToolTipPosition } from '../../common/WithTooltip';
import FieldSet from '../../common/FieldSet';

const TestToolTip: React.FC = () => {
    const commonStyle: CSSProperties = {display: "inline-block", position: "relative", minWidth:"150px", height:"45px", paddingTop: "15px"};
    return (
        <Row>
            <Column>
                <FieldSet Title="Hover mouse on text to see tooltip">
                    <Row>
                        <Column>
                            <div style={{...commonStyle, fontWeight: "bold"}}>
                                <span>ToolTip colors:</span>
                            </div>
                        </Column>
                        <Column>
                            <div style={commonStyle}>
                                <WithTooltip toolTipText = "This is a default tooltip">
                                    <span>Default Tooltip</span>
                                </WithTooltip>
                            </div>
                        </Column>
                        <Column>
                            <div style={commonStyle}>
                                <WithTooltip toolTipText = "This is a red tooltip" toolTipColor={ToolTipColor.Red}>
                                    <span>Red Tooltip</span>
                                </WithTooltip>
                            </div>
                        </Column>
                        <Column>
                            <div style={commonStyle}>
                                <WithTooltip toolTipText = "This is a green tooltip" toolTipColor={ToolTipColor.Green}>
                                    <span>Green Tooltip</span>
                                </WithTooltip>
                            </div>
                        </Column>
                        <Column>
                            <div style={commonStyle}>
                                <WithTooltip toolTipText = "This is a blue tooltip" toolTipColor={ToolTipColor.Blue}>
                                    <span>Blue Tooltip</span>
                                </WithTooltip>
                            </div>
                        </Column>
                        <Column>
                            <div style={commonStyle}>
                                <WithTooltip toolTipText = "This is a yellow tooltip" toolTipColor={ToolTipColor.Yellow}>
                                    <span>Yellow Tooltip</span>
                                </WithTooltip>
                            </div>
                        </Column>
                        <Column>
                            <div style={commonStyle}>
                                <WithTooltip toolTipText = "This is a grey tooltip" toolTipColor={ToolTipColor.Grey}>
                                    <span>Grey Tooltip</span>
                                </WithTooltip>
                            </div>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <div style={{...commonStyle, fontWeight: "bold"}}>
                                <span>ToolTip Positions:</span>
                            </div>
                        </Column>
                        <Column>
                            <div style={commonStyle}>
                                <WithTooltip toolTipText = "This is a bottom tooltip" toolTipPosition={ToolTipPosition.Bottom}>
                                    <span>Bottom Tooltip</span>
                                </WithTooltip>
                            </div>
                        </Column>
                        <Column>
                            <div style={commonStyle}>
                                <WithTooltip toolTipText = "This is a top tooltip" toolTipPosition={ToolTipPosition.Top}>
                                    <span>Top Tooltip</span>
                                </WithTooltip>
                            </div>
                        </Column>
                        <Column>
                            <div style={commonStyle}>
                                <WithTooltip toolTipText = "This is a left tooltip" toolTipPosition={ToolTipPosition.Left}>
                                    <span>Left Tooltip</span>
                                </WithTooltip>
                            </div>
                        </Column>
                        <Column>
                            <div style={commonStyle}>
                                <WithTooltip toolTipText = "This is a right tooltip" toolTipPosition={ToolTipPosition.Right}>
                                    <span>Right Tooltip</span>
                                </WithTooltip>
                            </div>
                        </Column>
                    </Row>
                </FieldSet>
            </Column>
        </Row>
    )
}

export default TestToolTip;