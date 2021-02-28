import { useFetchHandler } from "../../logic/services/fetchHandler";
import { ServiceType } from "../../logic/services/serviceCallerInterfaces";
import { ITestServiceResponse, ITestServiceRequest, ITestExternalServiceResponse } from "./TestServiceInterfaces";
import { delayedPromise } from "../../logic/functions/misc";
import { TestServiceRequestType } from "./TestServiceEnum";

const getRandom = () => {
    return Math.floor(Math.random() * 10) + 1;
}

export const useTestServiceHandler: () => ServiceType<ITestServiceRequest, ITestServiceResponse | ITestExternalServiceResponse> = () => {
    const { Get, Abort } = useFetchHandler( { serviceUrl: "http://localhost:3000", externalService: true });
    const externalService = useFetchHandler( { serviceUrl: "https://jsonplaceholder.typicode.com", externalService: true, timeOut: 30000 } );

    const getData: ServiceType<ITestServiceRequest, ITestServiceResponse | ITestExternalServiceResponse> = async ( { context, serviceRequest } ) => {
        if (serviceRequest)
        {
            if ( serviceRequest.Type === TestServiceRequestType.GetSample_3 ) {
                return delayedPromise( 1500 ).then(() => Get<ITestServiceResponse>({action: "InexistentService404"}));
            }
            
            if( serviceRequest.Type === TestServiceRequestType.GetSample_1 )
            {
                context.appContext.ChangeLanguage("EN");
            }

            if( serviceRequest.Type === TestServiceRequestType.AbortSample ) {
                return delayedPromise( 2000 )
                .then( async () => {
                    let returnValue = Get<ITestServiceResponse>({action: "InexistentService404"});
                    Abort();
                    return await returnValue;
                })
            }

            if( serviceRequest.Type === TestServiceRequestType.CallExternal ) {
                return externalService.Get<ITestExternalServiceResponse>({action: "posts", route: `${getRandom()}`});
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