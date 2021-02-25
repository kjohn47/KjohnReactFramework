import { useCallback, useContext } from "react"
import { ServicesContext } from "../../config/AppProvider"
import { IDictionary } from "../../functions/misc";
import { IKnownAction, IKnownService, IServiceRoute } from "../../services/serviceCallerInterfaces";
import { getQueryStringFromDictionary } from "../../functions/routeHandling";
import { apiServerUrl, krfGatewayService } from "../../config/configuration";

const getRoute = (action: IKnownAction, route: string): IServiceRoute => {
    if(action.Routes === undefined || action.Routes === null)
    {
        return {
            Name: route
        };
    }
    
    const selectedRoute = action.Routes[route];
    
    if(selectedRoute === undefined || selectedRoute === null)
    {
        return {
            Name: route
        };
    }
        
    return selectedRoute;
}

export const useKnownServices = () => {
    const knownServices = useContext(ServicesContext);

    const getKnownService = useCallback((service: string): IKnownService => {
        const selectedService = knownServices[service];
        if(selectedService !== undefined && selectedService !== null)
            return selectedService;

        return {
            Name: service
        }
    }, [knownServices])
    
    const getKnownAction = useCallback((selectedService: IKnownService, action: string | undefined, route: string | undefined = undefined, query: IDictionary<string> | undefined = undefined): string => {      
        let Gw = selectedService.GWRoute;
        let urlOut = "";
        if(selectedService.Actions === undefined)
        {
            urlOut = `${selectedService.Name}${action !== undefined ? `/${action}` : ""}${route !== undefined ? `/${route}`: ""}`;
        }
        else if(action !== undefined)
        {
            const selectedAction = selectedService.Actions[action];
        
            if(selectedAction === null || selectedAction === undefined)
            {
                urlOut = `${selectedService.Name}${action !== undefined ? `/${action}` : ""}${route !== undefined ? `/${route}`: ""}`;
            }
            else
            {
                const currRoute = route !== undefined ? getRoute(selectedAction, route) : undefined;
                if(currRoute !== undefined && currRoute.GWRoute !== undefined)
                {
                    Gw = currRoute.GWRoute;
                }
                else if(selectedAction.GWRoute !== null && selectedAction.GWRoute !== undefined )
                {
                    Gw = selectedAction.GWRoute;
                }

                urlOut = `${selectedService.Name}/${selectedAction.Name}${currRoute !== undefined ? `/${currRoute.Name}`: ""}`;
            }
        }

        //Prepare output:
        const queryStr = getQueryStringFromDictionary(query);
        if( krfGatewayService && Gw !== undefined )
        {
            return`${apiServerUrl}/${Gw}/${urlOut}${queryStr}`;
        }

        return`${apiServerUrl}/${urlOut}${queryStr}`;
    }, [])

    return {
        getKnownService,
        getKnownAction
    }
}