import { ServiceType } from "../../../common/services/serviceCallerInterfaces";
import { fetchGetHandler } from "../../../common/services/fetchHandler";
import { ContextActions, AppLanguage } from "../../../common/context/appContextEnums";
import { IResult } from "./TestServices";
import { apiServerUrl } from "../../../common/config/configuration";

const delay = ( t: number ) => new Promise( resolve => setTimeout( resolve, t ) );

export const serverCallTest: ServiceType<IResult, IResult> = async ( context, request, response ) => {
    if ( request === undefined ) {
        return fetchGetHandler<IResult>( `${ apiServerUrl }/404`, "df234423gf.dgdfgdfgdfdg4353fgdfgdf.756dfgdf" );
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