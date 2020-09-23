import { useCallback, useContext } from "react"
import { ServicesContext } from "../../config/AppProvider"
import { IDictionary } from "../../functions/misc";
import { IKnownAction } from "../../services/serviceCallerInterfaces";
import { getQueryStringFromDictionary } from "../../functions/routeHandling";

const getRoute = (action: IKnownAction, route: string): string => {
    if(action.Routes === undefined || action.Routes === null)
    {
        return route;
    }
    
    const selectedRoute = action.Routes[route];
    
    if(selectedRoute === undefined || selectedRoute === null)
    {
        return route;
    }
        
    return selectedRoute;
}

export const useKnownServices = () => {
    const knownServices = useContext(ServicesContext);

    const getKnownService = useCallback((service: string): string => {
        const selectedService = knownServices[service];
        return selectedService ? selectedService.Name : "";
    }, [knownServices])
    
    const getKnownAction = useCallback((service: string, action: string, route: string | undefined = undefined, query: IDictionary<string> | undefined = undefined): string => {
        const selectedService = knownServices[service];

        if(selectedService === null || selectedService === undefined)
        {
            return "";
        }
    
        const selectedAction = selectedService.Actions[action];
        
        if(selectedAction === null || selectedAction === undefined)
        {
            return "";
        }
        
        const url = `${selectedAction.Name}${route !== undefined ? `/${getRoute(selectedAction, route)}` : ""}`;
        const queryStr = getQueryStringFromDictionary(query);
    
        return `${url}${queryStr}`;
    }, [knownServices])

    return {
        getKnownService,
        getKnownAction
    }
}