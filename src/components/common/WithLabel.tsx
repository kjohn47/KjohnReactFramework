import React from 'react';
import Row from './Row';
import Column, { ColumnNumber } from './Column';

interface IWithLabel {
    htmlFor?: string;
    text: string;
    inline?: boolean;
    className?: string;
}

const WithLabel: React.FC<IWithLabel> = ( props ) => {
    return (
        <Row>
            <Column className={ "withLabelDiv" + ( props.className ? ( " " + props.className ) : "" ) } >
                { !props.inline ?
                    <Row className="labelRow">
                        <Column>
                            <Row>
                                <Column>
                                    <label className="withLable_lable" htmlFor={ props.htmlFor }>{ props.text }</label>
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    { props.children }
                                </Column>
                            </Row>
                        </Column>
                    </Row>
                    :
                    <Row className="inlineLabelRow">
                        <Column
                            full={ ColumnNumber.C4 }
                            large={ ColumnNumber.C5 }
                            medium={ ColumnNumber.C7 }
                            tablet={ ColumnNumber.C9 }
                            mobile={ ColumnNumber.C20 }
                        >
                            <label className="withLable_lable_inline" htmlFor={ props.htmlFor }>{ props.text }</label>
                        </Column>
                        <Column
                            full={ ColumnNumber.C16 }
                            large={ ColumnNumber.C15 }
                            medium={ ColumnNumber.C13 }
                            tablet={ ColumnNumber.C11 }
                            mobile={ ColumnNumber.C20 }
                        >
                            { props.children }
                        </Column>
                    </Row>
                }
            </Column>
        </Row>
    )
}

export default WithLabel;