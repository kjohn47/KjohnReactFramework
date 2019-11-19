import React from 'react';
import Card, { ICard } from './Card';
import Row from './Row';
import Column from './Column';
import PageHeader from './PageHeader';



export interface ICardList {
    data: ICard[];
}

const CardList: React.FC<ICardList> = ( props ) => {
    return (
        <React.Fragment>
            { props.children && <PageHeader>
                { props.children }
            </PageHeader> }
            <Row>
                {
                    props.data.map( ( card, i ) =>
                        <Column key={ i } className="CardListComponent">
                            <Card { ...card } />
                        </Column>
                    )
                }
            </Row>
        </React.Fragment>
    );
}

export default CardList;