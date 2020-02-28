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
                            full={ ColumnNumber.C6 }
                            large={ ColumnNumber.C8 }
                            medium={ ColumnNumber.C10 }
                            tablet={ ColumnNumber.C10 }
                            mobile={ ColumnNumber.C20 }
                        >
                            <label className="withLable_lable_inline" htmlFor={ props.htmlFor }>{ props.text }</label>
                        </Column>
                        <Column
                            full={ ColumnNumber.C14 }
                            large={ ColumnNumber.C12 }
                            medium={ ColumnNumber.C10 }
                            tablet={ ColumnNumber.C10 }
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