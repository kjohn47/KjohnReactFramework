import { useState } from "react";
import { useTestServiceHandler } from "./TestServiceHandler"
import { useServiceCaller } from "../../common/services/serviceCaller";
import { ITestServiceRequest, ITestServiceResponse, ITestServices } from "./TestServiceInterfaces";
import { ErrorCodes } from "../../common/context/appErrorEnums";
import { TestServiceRequestType } from "./TestServiceEnum";

export const useTestService: () => ITestServices = () => {
    const getData = useTestServiceHandler();
    const [ isLoading2, setIsLoading2 ] = useState<boolean>( false );
    const [ serviceResponse1, serviceHandler1 ] = useServiceCaller<ITestServiceRequest, ITestServiceResponse>( getData );
    const [ serviceResponse2, serviceHandler2 ] = useServiceCaller<ITestServiceRequest, ITestServiceResponse>( getData, ErrorCodes.GenericError, true );
    const [ serviceResponse3, serviceHandler3 ] = useServiceCaller<ITestServiceRequest, ITestServiceResponse>( getData ); 

    const SampleService_1 = () => {
        serviceHandler1({
            Type: TestServiceRequestType.GetSample_1
        })
    }

    const SampleService_2 = () => {
        setIsLoading2(true)
        serviceHandler2({
            Type: TestServiceRequestType.GetSample_2
        }).then(() => setIsLoading2(false))
    }

    const SampleService_3 = () => {
        serviceHandler3({
            Type: TestServiceRequestType.GetSample_3
        })
    }

    return {
        serviceResponse1,
        SampleService_1,
        serviceResponse2,
        isLoading2,
        SampleService_2,
        serviceResponse3,
        SampleService_3
    }
}