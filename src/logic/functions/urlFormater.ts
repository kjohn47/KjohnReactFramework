import { IDictionary } from "./misc";

export const getKnownUrl = (service: string, action: string, id: string | undefined = undefined, query: IDictionary<string> | undefined = undefined): string => {
    const apiUrls: any = {};
    const selectedService = apiUrls[service];
    
    if(selectedService === null || selectedService === undefined)
    {
        return "";
    }

    const selectedAction = selectedService.Actions[action];
    
    if(selectedAction === null || selectedAction === undefined)
    {
        return "";
    }

    const url = `${selectedService.Name}/${selectedAction.Name}${id !== undefined ? `/${id}`: ""}`;
    let queryStr = "";

    if(query !== undefined)
    {
        Object.entries(query).forEach(([key, value], i) => {
            queryStr += `${(i !== 0 ? "&" : "") + key }=${value}`;
        });
    }

    return `${url}${queryStr !== "" ? `?${queryStr}` : ""}`;
}