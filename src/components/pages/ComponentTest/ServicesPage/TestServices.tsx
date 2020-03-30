import React, { useState } from 'react';
import { useServiceCaller } from '../../../../common/services/serviceCaller';
import { ErrorCodes } from '../../../../common/context/appErrorEnums';
import WithTooltip, { ToolTipPosition, ToolTipColor } from '../../../common/WithTooltip';
import Button, { ButtonTypes } from '../../../common/Button';
import Loader from '../../../common/Loader';
import { useServerCallTest } from './TestServicesHooks';

export interface IResult {
  id: number;
  text: string;
}

const TestServices: React.FC = () => {
  const getData = useServerCallTest();
  const [ isLoading, setIsLoading ] = useState<boolean>( false );
  const [ serviceResponse, serviceHandler ] = useServiceCaller<IResult, IResult>( getData );
  const [ serviceResponse2, serviceHandler2 ] = useServiceCaller<IResult, IResult>( getData, ErrorCodes.GenericError, true );
  const [ serviceResponse3, serviceHandler3 ] = useServiceCaller<IResult, IResult>( getData );  

  const loadService2 = () => {
    setIsLoading( true );
    serviceHandler2( { text: "test2", id: 0 } ).then( () => { setIsLoading( false ) } ).catch();
  }

  return ( <div className="TestPageStuff">
    <div className="center_menu_button">
      <WithTooltip toolTipText={ "Call normal service with big loading" } toolTipPosition={ ToolTipPosition.Top } toolTipColor={ ToolTipColor.Green }  >
        <Button className="button_width" onClick={ () => { serviceHandler( { text: "test", id: 0 } ) } } buttonType={ ButtonTypes.Confirmation } >
          { "Call loading service" }
        </Button>
      </WithTooltip>
    </div>
    <div>
      {
        serviceResponse !== undefined && serviceResponse.id + " : " + serviceResponse.text
      }
    </div>
    <hr />
    <Loader isLoading={ isLoading } withoutText>
      <div className="center_menu_button">
        <WithTooltip toolTipText={ "Call service that loads on same page" } toolTipPosition={ ToolTipPosition.Left } toolTipColor={ ToolTipColor.Red } >
          <Button className="button_width" onClick={ () => { loadService2() } } buttonType={ ButtonTypes.Danger } >
            { "Call self loading" }
          </Button>
        </WithTooltip>
      </div>
    </Loader>
    <div>
      {
        serviceResponse2 !== undefined && serviceResponse2.id + " : " + serviceResponse2.text
      }
    </div>
    <hr />
    <div className="center_menu_button">
      <WithTooltip toolTipText={ "Call service that returns error" } toolTipPosition={ ToolTipPosition.Right } toolTipColor={ ToolTipColor.Grey } >
        <Button className="button_width" onClick={ () => { serviceHandler3() } } buttonType={ ButtonTypes.Warning } >
          { "Call Error" }
        </Button>
      </WithTooltip>
    </div>
    <div>
      {
        serviceResponse3 !== undefined && serviceResponse3.id + " : " + serviceResponse3.text
      }
    </div>
  </div> );
}

export default TestServices;