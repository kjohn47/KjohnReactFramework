import React from 'react';
import CardList from '../../../common/CardList';
import { ICard } from '../../../common/Card';
import { KnownPages } from '../../../../common/context/routeContextEnums';
import CardContent from '../../../common/CardContent';

const TestCards: React.FC = () => {
  const getCardItem: ( id: number ) => ICard = ( id ) => {
    return {
      title: "Card Test - " + id,
      detailsPage: KnownPages.Home,
      image: "imgTest",
      footerText: <span>{ new Date().toLocaleString() }</span>,
      cardContent: <CardContent data={ [
        {
          field: "field 1",
          value: "001"
        },
        {
          field: "field 2",
          value: "002"
        },
        {
          field: "field 3",
          value: "003"
        }
      ] }
      />
    }
  };
  return (
    <CardList
      data={
        [
          getCardItem( 1 ),
          getCardItem( 2 ),
          getCardItem( 3 )
        ]
      }
    >
      Test of list of cards
    </CardList>
  );
}

export default TestCards;