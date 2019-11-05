export const getQueryStringParams = <IQueryType>( queryString: string ): IQueryType => 
{
    let queryParams: URLSearchParams = new URLSearchParams( queryString );
    let result: { [key: string]: any } = {}
    
    queryParams.forEach( ( val, key ) => {
        result[key] = val;
    } );

    return result as IQueryType;
}