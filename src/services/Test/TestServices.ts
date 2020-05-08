import { useTestServiceHandler } from "./TestServiceHandler"
import { useServiceCaller } from "../../logic/services/serviceCaller";
import { ITestServiceRequest, ITestServiceResponse, ITestServices, ITestExternalServiceResponse } from "./TestServiceInterfaces";
import { ErrorCodes } from "../../logic/context/Error/appErrorEnums";
import { TestServiceRequestType } from "./TestServiceEnum";
import { useDocumentDownloader } from "../../logic/services/fetchHandler";

export const useTestService: () => ITestServices = () => {
    const getData = useTestServiceHandler();
    const Sample1 = useServiceCaller<ITestServiceRequest, ITestServiceResponse>( { service: getData} );
    const Sample2 = useServiceCaller<ITestServiceRequest, ITestServiceResponse>( { service: getData, processError: ErrorCodes.GenericError, localLoading: true } );
    const Sample3 = useServiceCaller<ITestServiceRequest, ITestServiceResponse>( { service: getData } ); 
    const SampleAbort = useServiceCaller<ITestServiceRequest, ITestServiceResponse>( { service: getData, localLoading: true } ); 
    const SampleExternal = useServiceCaller<ITestServiceRequest, ITestExternalServiceResponse>( { service: getData, localLoading: true } ); 
    const FileDownloader = useDocumentDownloader( {
        serviceUrl: "http://localhost:3000/Assets/",
        documentPath: "pdfFile",
        externalService: true,
        loadProgress: true
    } );

    const SampleService_1 = () => {
        Sample1.serviceHandler({
            Type: TestServiceRequestType.GetSample_1
        })
    }

    const SampleService_2 = async () => {
        Sample2.serviceHandler({
            Type: TestServiceRequestType.GetSample_2
        })
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

    const DownloadFile = async () => {
        console.log(await FileDownloader.download());
    }

    const AbortDownload = () => {
        FileDownloader.abort();
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
        ExternalLoading: SampleExternal.serviceLoading,
        DownloadFile,
        AbortDownload,
        Downloading: FileDownloader.isDownloading,
        DownloadProgress: FileDownloader.downloadProgress
    }
}