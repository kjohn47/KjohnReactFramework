import React, { useState, useContext } from 'react';
import { ServiceType } from '../../../common/services/serviceCallerInterfaces';
import { ContextActions, AppLanguage } from '../../../common/context/appContextEnums';
import { AppContext } from '../../../common/config/appConfig';
import { useServiceCaller } from '../../../common/services/serviceCaller';
import { ErrorCodes } from '../../../common/context/appErrorEnums';
import WithTooltip, { ToolTipPosition, ToolTipColor } from '../../common/WithTooltip';
import Button, { ButtonTypes } from '../../common/Button';
import Loader from '../../common/Loader';

interface IResult {
    id: number;
    text: string;
  }

const TestButtons: React.FC = () => {
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
  
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [appContext] = useContext( AppContext );
    const [serviceResponse, serviceHandler] = useServiceCaller<IResult, IResult>( serverCallTest );
    const [serviceResponse2, serviceHandler2] = useServiceCaller<IResult, IResult>( serverCallTest, ErrorCodes.GenericError, true );
    const serviceHandler3 = useServiceCaller<IResult, IResult>( serverCallTest )[1];
  
    const loadService2 = () => {
      setIsLoading( true );
      serviceHandler2({ text: "test2", id: 0 }).then( () => { setIsLoading(false) });
    }
  
    return( <div className = "TestPageStuff">
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
  </div> )  ;
  }

  export default TestButtons;