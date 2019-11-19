import { ServiceType } from "../../../common/services/serviceCallerInterfaces";
import { fetchGetHandler } from "../../../common/services/fetchHandler";
import { ContextActions, AppLanguage } from "../../../common/context/appContextEnums";
import { IResult } from "./TestServices";

const delay = ( t: number ) => new Promise( resolve => setTimeout( resolve, t ) );

export const serverCallTest: ServiceType<IResult, IResult> = async ( context, request, response ) => {
    if ( request === undefined ) {
        return fetchGetHandler<IResult>( 'http://httpstat.us/404' );
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
                text: request.text + " - " + context.appContext.Get.globalLanguage.toString()
            }
        } );
}