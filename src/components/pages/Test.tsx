import React, { useState, useEffect, useContext } from 'react';
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

interface IResult {
  id: number;
  text: string;
}

const getResults = ( search?: string ): IResult[] => {
  let resultList: IResult[] = [
      {
        id: 0,
        text: "Result zero"
      },
      {
        id: 1,
        text: "Result one"
      },
      {
        id: 2,
        text: "Result two"
      },
      {
        id: 3,
        text: "Result three"
      },
      {
        id: 4,
        text: "Result four"
      }
    ];

  if( search === undefined || search === "" )
  {
    return resultList;
  }

  return resultList.filter( r => r.id.toString().includes( search ) || r.text.includes( search ) );
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

function loot( text:string, oldLenght: number, lootBox: boolean ){
  if( lootBox && text.length > oldLenght && text !== "" )
  {
    let newText = text.substring( 0, text.length - 1 );
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"#$%&/()=?@£§{[]}«»´`~^ºª*+¨-_.:,;| ';
    newText += characters.charAt(Math.floor(Math.random() * characters.length));
    return newText;
  }

  return text;
}

const Test: React.FC = () => {
  const [search, setSearch] = useState<string>( "" );
  const [results, setResults] = useState<IResult[]>( [] );
  const [showTable, setShowTable] = useState<boolean>( true );
  const [lootBox, setLootBox] = useState<boolean>( true );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appContext] = useContext( AppContext );
  const [serviceResponse, serviceHandler] = useServiceCaller<IResult, IResult>( serverCallTest );
  const [serviceResponse2, serviceHandler2] = useServiceCaller<IResult, IResult>( serverCallTest, ErrorCodes.GenericError, true );
  const serviceHandler3 = useServiceCaller<IResult, IResult>( serverCallTest )[1];

  useEffect(() => {
    setResults( getResults( search ) );
    document.title = "MyReactHookSearch: " + search;
  }, [search]);

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
    <div className="App">
      { "Hash token tested correctly: " + testhash( "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", "7f75367e7881255134e1375e723d1dea8ad5f6a4fdb79d938df1f1754a830606" ) }
      <div className = "searchBox">
        <label>{appContext.translations.testPage.searchBox}</label>
        <input 
          type = "text" 
          onChange = { (event: React.FormEvent<HTMLInputElement>) => setSearch( loot( event.currentTarget.value, search.length, lootBox ) ) }
          value = { search }
        />
        <label>&nbsp;Loot?&nbsp;</label>
        <input type="checkbox" checked = {lootBox} onChange = { (event: React.FormEvent<HTMLInputElement>) => { setLootBox( event.currentTarget.checked ) } }/>
        <hr />      
      </div>
      <div className = "table">
        <div className = "resultTable tableHeader">
          <span className="leftCol header">ID</span><span className="rightCol header">{appContext.translations.testPage.text}</span>
        </div>
        { showTable && results.map( (r, i) => 
          <div className = "resultTable" key = { i }>
            <span className="leftCol">{r.id}</span><span className="rightCol" >{r.text}</span>
          </div>
        )}
        <WithTooltip className = "tableHideToolTip" toolTipText = "Show or Hide the table" toolTipColor = { ToolTipColor.Blue } toolTipPosition = { ToolTipPosition.Bottom }>
          <div className = "tableHide" onClick = { () => { setShowTable( !showTable ) } } >
            <span> { showTable ? <span>&uarr;</span> : <span>&darr;</span> } </span>
          </div>
        </WithTooltip>
      </div>
      <div className = "tableBottom">
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
                { text: "03" }
              ],
              [
                { text: "04 AASASDSFSDFS" },
                { text: "Link to home", page: KnownPages.Home },
                { text: "06 AASASDSFSDFS DFSFSDFSDFSFSD" }
              ],
              [
                { text: "07" },
                { text: "08" },
                { text: "09 AASASDSFSDFS FDSFSDFDSF", onClickEdit: () => {}, onClickRemove: () => {} }
              ]
          ]
          }
          highlightRows
        />
      </div>
    </div>
  );
}

export default Test;
