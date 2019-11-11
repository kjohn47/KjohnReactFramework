import React, { useState, useContext } from 'react';
import { AppContext  } from '../../common/config/appConfig';
import { useServiceCaller } from '../../common/services/serviceCaller';
import { ServiceType } from '../../common/services/serviceCallerInterfaces';
import { ContextActions, AppLanguage, KnownPages } from '../../common/context/appContextEnums';
import { ErrorCodes } from '../../common/context/appErrorEnums';
import Loader from '../common/Loader';
import SHA from "sha.js";
import Button, { ButtonTypes } from '../common/Button';
import WithTooltip, { ToolTipPosition, ToolTipColor } from '../common/WithTooltip';
import InputText from '../common/InputText';
import { AppRegex } from '../../common/config/regexEnum';
import WithLabel from '../common/WithLabel';
import Column, { ColumnNumber } from '../common/Column';
import Row from '../common/Row';
import Table from '../common/Table';
import { ICard } from '../common/Card';
import CardContent from '../common/CardContent';
import CardList from '../common/CardList';
import PageHeader from '../common/PageHeader';

interface IResult {
  id: number;
  text: string;
}

const serverCallTest: ServiceType<IResult, IResult> = ( context, request ) => {
  if( request === undefined ) 
    return {
        hasError: true,
        caughtError: "Error from server"
    };

  context.appContext.Set( {
      type: ContextActions.ChangeLanguage,
      payload: {
        globalLanguage: AppLanguage.EN
      }
  } );

  return {
    id: request.id,
    text: request.text + " - " + context.appContext.Get.globalLanguage.toString()
  };
}

const getCardItem: ( id: number ) => ICard = ( id ) => {
  return {
  title: "Card Test - " + id, 
  detailsPage: KnownPages.Home,
  image: "imgTest",
  footerText: <span>{ new Date().toLocaleString() }</span>,
  cardContent: <CardContent data = { [
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

const Test: React.FC = () => {  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appContext] = useContext( AppContext );
  const [serviceResponse, serviceHandler] = useServiceCaller<IResult, IResult>( serverCallTest );
  const [serviceResponse2, serviceHandler2] = useServiceCaller<IResult, IResult>( serverCallTest, ErrorCodes.GenericError, true );
  const serviceHandler3 = useServiceCaller<IResult, IResult>( serverCallTest )[1];

  const loadService2 = () => {
    setIsLoading( true );
    serviceHandler2({ text: "test2", id: 0 }).then( () => { setIsLoading(false) });
  }
  
  const testhash = ( authToken: string, tokenHash: string ) =>
  {
    let verifyToken = SHA('sha256').update( authToken ).digest( 'hex' );
    if( verifyToken === tokenHash )
      return "yes";
    
      return "no";
  }
  

  return (
    <Row className="TestApp">
      <Column>
      <PageHeader>
        Test page :)
      </PageHeader>
        { "Hash token tested correctly: " + testhash( "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", "7f75367e7881255134e1375e723d1dea8ad5f6a4fdb79d938df1f1754a830606" ) }
        <div className = "TestPageStuff">
          <hr />
            <CardList 
              data = {
                [
                  getCardItem( 1 ),
                  getCardItem( 2 ),
                  getCardItem( 3 ),
                  getCardItem( 4 )
                ]
              }
            >
              Test of list of cards
            </CardList>
          <hr />
          <div className = "center_menu_button">
            <WithTooltip toolTipText = { appContext.translations.testPage.serviceCallTooltip1 } toolTipPosition = { ToolTipPosition.Top } toolTipColor = { ToolTipColor.Green }  >
              <Button  className = "button_width" onClick = { () => { serviceHandler( { text: "test", id: 0 } ) } } buttonType = { ButtonTypes.Confirmation } >
                { appContext.translations.testPage.serviceCallButton1 }
              </Button>
            </WithTooltip>
          </div>
          <div>
              {
                serviceResponse !== null && serviceResponse !== undefined && serviceResponse.id + " : " + serviceResponse.text
              }
          </div>
          <hr />
          <Loader isLoading = { isLoading } withoutText>
            <div className = "center_menu_button">
              <WithTooltip toolTipText = { appContext.translations.testPage.serviceCallTooltip2 } toolTipPosition = { ToolTipPosition.Left } toolTipColor = { ToolTipColor.Red } >
                <Button  className = "button_width" onClick = { () => { loadService2() } } buttonType = { ButtonTypes.Danger } >
                { appContext.translations.testPage.serviceCallButton2 }
                </Button>
              </WithTooltip>
            </div>
          </Loader>
          <div>
              {
                serviceResponse2 !== null && serviceResponse2 !== undefined && serviceResponse2.id + " : " + serviceResponse2.text
              }
          </div>
          <hr />
          <div className = "center_menu_button">
            <WithTooltip toolTipText = { appContext.translations.testPage.serviceCallTooltip3 } toolTipPosition = { ToolTipPosition.Right }  toolTipColor = { ToolTipColor.Grey } >
              <Button  className = "button_width" onClick = { () => { serviceHandler3() } } buttonType = { ButtonTypes.Warning } >
              { appContext.translations.testPage.serviceCallButton3 }
              </Button>
            </WithTooltip>
          </div>
          <hr />
          <Row>
            <Column
              full = { ColumnNumber.C10 } 
              large = { ColumnNumber.C14 }
              medium = { ColumnNumber.C17 }
              mobile = { ColumnNumber.C20 }
            >
              <WithLabel htmlFor = "TestInput" text = "Test Input Box" inline>
                <InputText
                  name = "TestInput"
                  validText = "Valid :)"
                  invalidText = "Invalid :("
                  notEmpty = { true }
                  onChange = { ( Output ) => { console.log( Output ) } }
                  onBlur = { ( Output ) => { console.log( Output ) } }
                  regexValidation = { AppRegex.NumberOnly }
                  allowOnlyRegex
                  placeHolder = "Test input box"
                />
              </WithLabel>
            </Column>
          </Row>
          <hr />
          <Table 
            header = { [ "A", "B", "C" ] }
            title = "Test Table 001"
            rows = { [
                [
                  { text: "01" },
                  { text: "02 AASASDSFSDFS" },
                  { text: "03 with a lot of text lalala lorem ipsum and dont say anything", onClickEdit: () => {}, onClickRemove: () => {}, toolTip: "This is a cell with edit", toolTipColor: ToolTipColor.Blue }
                ],
                [
                  { text: "04 AASASDSFSDFS" },
                  { text: "Link to home", page: KnownPages.Home, toolTip: "This is a cell link", toolTipColor: ToolTipColor.Green },
                  { text: "06 AASASDSFSDFS DFSFSDFSDFSFSD" }
                ],
                [
                  { text: "07", toolTip: "This is a cell tooltip", toolTipColor: ToolTipColor.Yellow },
                  { text: "08" },
                  { text: "09 AASASDSFSDFS FDSFSDFDSF", onClickEdit: () => {}, onClickRemove: () => {} }
                ]
            ]
            }
            highlightRows
          />
        </div>
      </Column>
    </Row>
  );
}

export default Test;
