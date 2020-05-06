import { useTestServiceHandler } from "./TestServiceHandler"
import { useServiceCaller } from "../../common/services/serviceCaller";
import { ITestServiceRequest, ITestServiceResponse, ITestServices, ITestExternalServiceResponse } from "./TestServiceInterfaces";
import { ErrorCodes } from "../../common/context/appErrorEnums";
import { TestServiceRequestType } from "./TestServiceEnum";
import { useDocumentDownloader } from "../../common/services/fetchHandler";
import { useEffect } from "react";

export const useTestService: () => ITestServices = () => {
    const getData = useTestServiceHandler();
    const Sample1 = useServiceCaller<ITestServiceRequest, ITestServiceResponse>( { service: getData} );
    const Sample2 = useServiceCaller<ITestServiceRequest, ITestServiceResponse>( { service: getData, processError: ErrorCodes.GenericError, localLoading: true } );
    const Sample3 = useServiceCaller<ITestServiceRequest, ITestServiceResponse>( { service: getData } ); 
    const SampleAbort = useServiceCaller<ITestServiceRequest, ITestServiceResponse>( { service: getData, localLoading: true } ); 
    const SampleExternal = useServiceCaller<ITestServiceRequest, ITestExternalServiceResponse>( { service: getData, localLoading: true } ); 
    const FileDownloader = useDocumentDownloader( {
        serviceUrl: "http://localhost:3000/Assets/pdfFile",
        documentPath: "",
        externalService: true,
        customHeaders: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ]
    } );

    useEffect(() => {
        console.log("loaded progress: ", FileDownloader.downloadProgress);
    }, [FileDownloader.downloadProgress])

    const SampleService_1 = () => {
        Sample1.serviceHandler({
            Type: TestServiceRequestType.GetSample_1
        })
    }

    const SampleService_2 = async () => {
        Sample2.serviceHandler({
            Type: TestServiceRequestType.GetSample_2
        })
        FileDownloader.download();
    }

    const SampleService_3 = () => {
        Sample3.serviceHandler({
            Type: TestServiceRequestType.GetSample_3
        })
    }

    const AbortSample = () => {
        SampleAbort.serviceHandler({
            Type: TestServiceRequestType.AbortSample
        })
    }

    const CallExternalService = () => {
        SampleExternal.serviceHandler( {
            Type: TestServiceRequestType.CallExternal
         } )
    }

    return {
        serviceResponse1: Sample1.serviceResponse,
        SampleService_1,
        serviceResponse2: Sample2.serviceResponse,
        isLoading2: Sample2.serviceLoading,
        SampleService_2,
        serviceResponse3: Sample3.serviceResponse,
        SampleService_3,
        AbortSample,
        AbortSampleLoading: SampleAbort.serviceLoading,
        ExternalService: SampleExternal.serviceResponse,
        CallExternalService,
        ExternalLoading: SampleExternal.serviceLoading
    }
}