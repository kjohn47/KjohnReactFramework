import { ServiceType } from "../../../../common/services/serviceCallerInterfaces";
import { ContextActions, AppLanguage } from "../../../../common/context/appContextEnums";
import { IResult } from "./TestServices";
import { useFetchGetHandler } from "../../../../common/services/fetchHandler";

const delay = ( t: number ) => new Promise( resolve => setTimeout( resolve, t ) );

export const useServerCallTest = () => {
    const fetchHandler = useFetchGetHandler<IResult>("localhost");
    const getData: ServiceType<IResult, IResult> = async ( context, request, response ) => {
        if ( request === undefined ) {
            return fetchHandler( "test" );
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
    return getData;
}