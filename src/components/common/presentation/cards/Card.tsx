import React from "react";
import Column, { ColumnNumber } from "../../structure/Column";
import Row from "../../structure/Row";
import PageSelector from "../../inputs/PageSelector";
import useTranslation from "../../../../logic/functions/getTranslation";
import { IDictionary, PageType } from "../../../../logic/functions/misc";

export interface ICard {
    className?: string;
    image?: string;
    title: string;
    cardContent?: string | React.ComponentType | JSX.Element | JSX.IntrinsicElements;
    footerText?: string | React.ComponentType | JSX.Element | JSX.IntrinsicElements;
    onClick?: () => {};
    detailsPage?: PageType;
    detailsQuery?: IDictionary<string>;
    detailsLinkText?: string;
}

const Card: React.FC<ICard> = ( props ) => {
    const { getTranslation } = useTranslation();
    let hasFooter: boolean = props.footerText !== undefined || props.detailsPage !== undefined;
    return (
        <div className={ "CardComponent" + ( props.className !== undefined ? props.className : "" ) }>
            { props.image && <Row className="CardRow">
                <Column className="CardImage">
                    { props.image }
                </Column>
            </Row> }
            <Row className="CardRow">
                <Column className={ "CardData" + ( !hasFooter ? " CardDataWithoutFooter" : "" ) }>
                    <Row>
                        <Column className="CardTitle">{ props.title }</Column>
                    </Row>
                    <Row>
                        <Column className="CardContent">
                            { props.children }
                            { props.cardContent && props.cardContent }
                        </Column>
                    </Row>
                </Column>
            </Row>
            { hasFooter &&
                <Row className="CardRow CardFooter">
                    { props.footerText && <Column full={ props.detailsPage === undefined ? ColumnNumber.C20 : ColumnNumber.C10 }
                        className="CardFooterLeft"
                    >
                        { props.footerText && props.footerText }
                    </Column> }
                    { props.detailsPage && <Column full={ props.footerText === undefined ? ColumnNumber.C20 : ColumnNumber.C10 }
                        className={ "CardFooterRight" + ( props.footerText ? "" : " CardFooterRightNoBorder" ) }
                    >
                        { props.detailsPage &&
                            <PageSelector page={ props.detailsPage } queryParams={ props.detailsQuery } highlight>
                                { props.detailsLinkText ? props.detailsLinkText : getTranslation( "_generic", "#(cardDetails)" ) }
                            </PageSelector>
                        }
                    </Column> }
                </Row>
            }
        </div>
    )
}

export default Card;