import React from "react";
import Column, { ColumnNumber } from "../../structure/Column";
import Row from "../../structure/Row";

interface ICardContent {
    className?: string;
    data: ICardData[];
}

export interface ICardData {
    field: string;
    value: string;
}

const CardContent: React.FC<ICardContent> = ( props ) => {
    return (
        <div className="CardContentComponent">
            {
                props.data.map( ( data, i ) =>
                    <Row className="CardContentRow" key={ i }>
                        <Column full={ ColumnNumber.C10 } className="CardContentLeft">
                            { data.field }
                        </Column>
                        <Column full={ ColumnNumber.C10 } className="CardContentRight">
                            { data.value }
                        </Column>
                    </Row>
                )
            }
        </div>
    )
}

export default CardContent;