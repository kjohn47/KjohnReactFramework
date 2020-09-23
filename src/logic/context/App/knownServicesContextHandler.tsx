import { useCallback, useContext } from "react"
import { ServicesContext } from "../../config/AppProvider"
import { IDictionary } from "../../functions/misc";
import { IKnownAction } from "../../services/serviceCallerInterfaces";

const getRoute = (action: IKnownAction, route: string): string => {
    if(action.Routes === undefined || action.Routes === null)
    {
        return "";
    }
    
    const selectedRoute = action.Routes[route];
    
    if(selectedRoute === undefined || selectedRoute === null)
    {
        return "";
    }
        
    return selectedRoute;
}

export const useKnownServices = () => {
    const knownServices = useContext(ServicesContext);

    const getKnownService = useCallback((service: string): string => {
        const selectedService = knownServices[service];
        return selectedService ? selectedService.Name : "";
    }, [knownServices])
    
    const getKnownAction = useCallback((service: string, action: string, route: string | undefined = undefined, customRoute: boolean = false, query: IDictionary<string> | undefined = undefined): string => {
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
        
        const url = `${selectedAction.Name}${route !== undefined ? `/${customRoute ? route : getRoute(selectedAction, route) }`: ""}`;
        let queryStr = "";
    
        if(query !== undefined)
        {
            Object.entries(query).forEach(([key, value], i) => {
                queryStr += `${(i !== 0 ? "&" : "") + key }=${value}`;
            });
        }
    
        return `${url}${queryStr !== "" ? `?${queryStr}` : ""}`;
    }, [knownServices])

    return {
        getKnownService,
        getKnownAction
    }
}