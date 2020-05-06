import { useFetchGetHandler } from "../../common/services/fetchHandler";
import { ServiceType } from "../../common/services/serviceCallerInterfaces";
import { ContextActions, AppLanguage } from "../../common/context/appContextEnums";
import { ITestServiceResponse, ITestServiceRequest, ITestExternalServiceResponse } from "./TestServiceInterfaces";
import { delayedPromise } from "../../common/functions/misc";
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
                context.appContext.Set( {
                    type: ContextActions.ChangeLanguage,
                    payload: {
                        globalLanguage: AppLanguage.EN
                    }
                } );
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