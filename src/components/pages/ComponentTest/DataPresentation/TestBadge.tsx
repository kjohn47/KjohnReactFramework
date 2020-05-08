import React, { CSSProperties } from 'react';
import Column from '../../../common/structure/Column';
import Row from '../../../common/structure/Row';
import FieldSet from '../../../common/presentation/wrapper/FieldSet';
import Badge, { BadgeColorEnum } from '../../../common/presentation/display/Badge';
import { ToolTipColor, ToolTipPosition } from '../../../common/presentation/wrapper/WithTooltip';

const TestBadge: React.FC = () => {
    const badgeDiv: CSSProperties = {
        padding: '10px',
        minWidth: '150px'        
    }

    return (
        <Row>
            <Column>
                <FieldSet Title="Badges Colors">
                    <Row>
                        <Column>
                            <div style={badgeDiv}>
                                <span>Default:</span>
                                <Badge Color = {BadgeColorEnum.Default}>
                                    100
                                </Badge>
                            </div>
                        </Column>
                        <Column>
                            <div style={badgeDiv}>
                                <span>Danger:</span>
                                <Badge Color = {BadgeColorEnum.Danger}>
                                    100
                                </Badge>
                            </div>
                        </Column>
                        <Column>
                            <div style={badgeDiv}>
                                <span>Confirmation:</span>
                                <Badge Color = {BadgeColorEnum.Confirmation}>
                                    100
                                </Badge>
                            </div>
                        </Column>
                        <Column>
                            <div style={badgeDiv}>
                                <span>Information:</span>
                                <Badge Color = {BadgeColorEnum.Information}>
                                    100
                                </Badge>
                            </div>
                        </Column>
                        <Column>
                            <div style={badgeDiv}>
                                <span>Warning:</span>
                                <Badge Color = {BadgeColorEnum.Warning}>
                                    100
                                </Badge>
                            </div>
                        </Column>
                        <Column>
                            <div style={badgeDiv}>
                                <span>Cancelation:</span>
                                <Badge Color = {BadgeColorEnum.Cancelation}>
                                    100
                                </Badge>
                            </div>
                        </Column>
                    </Row>
                </FieldSet>
                <FieldSet Title="Badges Clickable">
                    <Row>
                        <Column>
                            <div style={badgeDiv}>
                                <span>Default:</span>
                                <Badge Color = {BadgeColorEnum.Default} OnClick={() =>{}}>
                                    100
                                </Badge>
                            </div>
                        </Column>
                        <Column>
                            <div style={badgeDiv}>
                                <span>Danger:</span>
                                <Badge Color = {BadgeColorEnum.Danger} OnClick={() =>{}}>
                                    100
                                </Badge>
                            </div>
                        </Column>
                        <Column>
                            <div style={badgeDiv}>
                                <span>Confirmation:</span>
                                <Badge Color = {BadgeColorEnum.Confirmation} OnClick={() =>{}}>
                                    100
                                </Badge>
                            </div>
                        </Column>
                        <Column>
                            <div style={badgeDiv}>
                                <span>Information:</span>
                                <Badge Color = {BadgeColorEnum.Information} OnClick={() =>{}}>
                                    100
                                </Badge>
                            </div>
                        </Column>
                        <Column>
                            <div style={badgeDiv}>
                                <span>Warning:</span>
                                <Badge Color = {BadgeColorEnum.Warning} OnClick={() =>{}}>
                                    100
                                </Badge>
                            </div>
                        </Column>
                        <Column>
                            <div style={badgeDiv}>
                                <span>Cancelation:</span>
                                <Badge Color = {BadgeColorEnum.Cancelation} OnClick={() =>{}}>
                                    100
                                </Badge>
                            </div>
                        </Column>
                    </Row>
                </FieldSet>
                <FieldSet Title="Badges ToolTip">
                    <Row>
                        <Column>
                            <div style={badgeDiv}>
                                <span>Left:</span>
                                <Badge Color = {BadgeColorEnum.Default} ToolTip={{
                                    TooltipText: "Left Tooltip",
                                    ToolTipColor: ToolTipColor.Default,
                                    ToolTipPosition: ToolTipPosition.Left,
                                    forcePosition: true
                                }}>
                                    100
                                </Badge>
                            </div>
                        </Column>
                        <Column>
                            <div style={badgeDiv}>
                                <span>Right:</span>
                                <Badge Color = {BadgeColorEnum.Default} ToolTip={{
                                    TooltipText: "Right Tooltip",
                                    ToolTipColor: ToolTipColor.Green,
                                    ToolTipPosition: ToolTipPosition.Right,
                                    forcePosition: true
                                }}>
                                    100
                                </Badge>
                            </div>
                        </Column>
                        <Column>
                            <div style={badgeDiv}>
                                <span>Up:</span>
                                <Badge Color = {BadgeColorEnum.Default} ToolTip={{
                                    TooltipText: "Up Tooltip",
                                    ToolTipColor: ToolTipColor.Red,
                                    ToolTipPosition: ToolTipPosition.Top,
                                    forcePosition: true
                                }}>
                                    100
                                </Badge>
                            </div>
                        </Column>
                        <Column>
                            <div style={badgeDiv}>
                                <span>Down:</span>
                                <Badge Color = {BadgeColorEnum.Default} ToolTip={{
                                    TooltipText: "Bottom Tooltip",
                                    ToolTipColor: ToolTipColor.Grey,
                                    ToolTipPosition: ToolTipPosition.Bottom,
                                    forcePosition: true
                                }}>
                                    100
                                </Badge>
                            </div>
                        </Column>
                    </Row>
                </FieldSet>
            </Column>
        </Row>
    )
}

export default TestBadge;