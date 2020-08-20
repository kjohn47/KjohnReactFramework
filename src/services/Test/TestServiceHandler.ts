import { useFetchGetHandler } from "../../logic/services/fetchHandler";
import { ServiceType } from "../../logic/services/serviceCallerInterfaces";
import { ITestServiceResponse, ITestServiceRequest, ITestExternalServiceResponse } from "./TestServiceInterfaces";
import { delayedPromise } from "../../logic/functions/misc";
import { TestServiceRequestType } from "./TestServiceEnum";

export const useTestServiceHandler: () => ServiceType<ITestServiceRequest, ITestServiceResponse | ITestExternalServiceResponse> = () => {
    const { Get, Abort } = useFetchGetHandler<ITestServiceResponse>( { serviceUrl: "InexistentService404" });
    const externalService = useFetchGetHandler<ITestExternalServiceResponse>( { serviceUrl: "https://jsonplaceholder.typicode.com/posts", externalService: true, timeOut: 30000 } );

    const getData: ServiceType<ITestServiceRequest, ITestServiceResponse | ITestExternalServiceResponse> = async ( { context, serviceRequest } ) => {
        if (serviceRequest)
        {
            if ( serviceRequest.Type === TestServiceRequestType.GetSample_3 ) {
                return delayedPromise( 1500 ).then(() => Get());
            }
            
            if( serviceRequest.Type === TestServiceRequestType.GetSample_1 )
            {
                context.appContext.ChangeLanguage("EN");
            }

            if( serviceRequest.Type === TestServiceRequestType.AbortSample ) {
                return delayedPromise( 2000 )
                .then( async () => {
                    let returnValue = Get();
                    Abort();
                    return await returnValue;
                })
            }

            if( serviceRequest.Type === TestServiceRequestType.CallExternal ) {
                return externalService.Get("/1");
            }

            return delayedPromise( 2000 )
                .then( () => {
                    return {
                        Success: "True",
                        LanguageCode: context.appLanguage
                    }
                } );
        }
        return {}
    }
    return getData;
}