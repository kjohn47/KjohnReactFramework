import { ServiceType, IServiceError } from "../../../common/services/serviceCallerInterfaces";
import { ContextActions, AppLanguage } from "../../../common/context/appContextEnums";
import { IResult } from "./TestServices";

const delay = ( t: number ) => new Promise( resolve => setTimeout( resolve, t ) );

export const serverCallTest: ( fetchHandler: (query: string) => Promise<IResult | IServiceError> ) => ServiceType<IResult, IResult> = ( fetchHandler ) => async ( context, request, response ) => {
    if ( request === undefined ) {
        return fetchHandler( "/test" );
    }

    context.appContext.Set( {
        type: ContextActions.ChangeLanguage,
        payload: {
            globalLanguage: AppLanguage.EN
        }
    } );
    return delay( 1000 )
        .then( () => {
            return {
                id: request.id,
                text: request.text + " - " + context.appLanguage
            }
        } );
}