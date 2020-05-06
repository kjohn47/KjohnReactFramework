import React, { CSSProperties } from 'react';
import WithTooltip, { ToolTipPosition, ToolTipColor } from '../../../common/WithTooltip';
import Button, { ButtonTypes } from '../../../common/Button';
import Loader from '../../../common/Loader';
import { useTestService } from '../../../../Services/Test/TestServices';

const TestServices: React.FC = () => {
  const TestServices = useTestService();
  const boldText: CSSProperties = {
    fontWeight: 'bold'
  }

  return ( <div className="TestPageStuff">
    <div className="center_menu_button">
      <WithTooltip toolTipText={ "Call normal service with big loading" } toolTipPosition={ ToolTipPosition.Top } toolTipColor={ ToolTipColor.Green }  >
        <Button className="button_width" onClick={ () => { TestServices.SampleService_1() } } buttonType={ ButtonTypes.Confirmation } >
          { "Call loading service" }
        </Button>
      </WithTooltip>
    </div>
    <div>
      {
        TestServices.serviceResponse1 !== undefined && "Success: " + TestServices.serviceResponse1.Success + " - " + TestServices.serviceResponse1.LanguageCode
      }
    </div>
    <hr />
    <Loader isLoading={ TestServices.isLoading2 } withoutText>
      <div className="center_menu_button">
        <WithTooltip toolTipText={ "Call service that loads on same page" } toolTipPosition={ ToolTipPosition.Left } toolTipColor={ ToolTipColor.Red } >
          <Button className="button_width" onClick={ () => { TestServices.SampleService_2() } } buttonType={ ButtonTypes.Danger } >
            { "Call self loading" }
          </Button>
        </WithTooltip>
      </div>
    </Loader>
    <div>
      {
        TestServices.serviceResponse2 !== undefined && "Success: " + TestServices.serviceResponse2.Success + " - " + TestServices.serviceResponse2.LanguageCode
      }
    </div>
    <hr />
    <div className="center_menu_button">
      <WithTooltip toolTipText={ "Call service that returns error" } toolTipPosition={ ToolTipPosition.Right } toolTipColor={ ToolTipColor.Grey } >
        <Button className="button_width" onClick={ () => { TestServices.SampleService_3() } } buttonType={ ButtonTypes.Warning } >
          { "Call Error" }
        </Button>
      </WithTooltip>
    </div>
    <div>
      {
        TestServices.serviceResponse3 !== undefined && "Success: " + TestServices.serviceResponse3.Success + " - " + TestServices.serviceResponse3.LanguageCode
      }
    </div>
    <hr />
    <Loader isLoading={ TestServices.AbortSampleLoading } withoutText>
      <div className="center_menu_button">
        <WithTooltip toolTipText={ "Call service that will be aborted" } toolTipPosition={ ToolTipPosition.Left } >
          <Button className="button_width" onClick={ () => { TestServices.AbortSample() } } buttonType={ ButtonTypes.Information } >
            { "Call Abort" }
          </Button>
        </WithTooltip>
      </div>
    </Loader>
    <hr />
    <div className="center_menu_button">
      <WithTooltip toolTipText={ TestServices.Downloading ? "Abort Download" : "Download File" } toolTipPosition={ ToolTipPosition.Left } >
        <Button className="button_width" onClick={ () => { TestServices.Downloading ? TestServices.AbortDownload() : TestServices.DownloadFile() } } buttonType={ ButtonTypes.Default } >
          { TestServices.Downloading ? ( "("+TestServices.DownloadProgress+"%) Abort") : "Download File" }
        </Button>
      </WithTooltip>
    </div>
    <hr />
    <Loader isLoading={ TestServices.ExternalLoading } withoutText>
      <div className="center_menu_button">
        <WithTooltip toolTipText={ "Call external service" } toolTipPosition={ ToolTipPosition.Bottom } toolTipColor={ ToolTipColor.Blue } >
          <Button className="button_width" onClick={ () => { TestServices.CallExternalService() } } buttonType={ ButtonTypes.Cancelation } >
            { "Call External" }
          </Button>
        </WithTooltip>
      </div>
      {TestServices.ExternalService && <div>
        <div style={boldText}>Response from external json placeholder service:</div>
        <div><span style={boldText}>ID: </span><span>{TestServices.ExternalService.id}</span></div>
        <div><span style={boldText}>UserID: </span><span>{TestServices.ExternalService.userId}</span></div>
        <div><span style={boldText}>Title: </span><span>{TestServices.ExternalService.title}</span></div>
        <div><span style={boldText}>Body: </span><span>{TestServices.ExternalService.body}</span></div>
      </div>}
    </Loader>
  </div> );
}

export default TestServices;