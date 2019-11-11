import React from 'react';
import Card, { ICard } from '../../components/common/Card';
import Row from '../../components/common/Row';
import Column from '../../components/common/Column';



export interface ICardList {
    data: ICard[];
}

const CardList: React.FC<ICardList> = ( props ) => {
    return (
        <React.Fragment>
            {props.children && <Row>
                <Column className = "CardsListTitle">
                    {props.children}
                </Column>
            </Row>}
            <Row>
                {
                    props.data.map( ( card, i ) =>
                        <Column key = { i } className = "CardListComponent">
                            <Card {...card } />
                        </Column>
                    )
                }
            </Row>
        </React.Fragment>
    );
}

export default CardList;