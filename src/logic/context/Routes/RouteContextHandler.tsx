import { useContext } from 'react';
import { RouteContext } from '../../config/AppProvider';

const useRouteHandler = () => {
    const routeContext = useContext(RouteContext);
    return {...routeContext}
}

export default useRouteHandler;