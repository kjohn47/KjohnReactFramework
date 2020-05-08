import React from 'react';
import Card, { ICard } from './Card';
import Row from '../../structure/Row';
import Column from '../../structure/Column';
import PageHeader from '../display/PageHeader';



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