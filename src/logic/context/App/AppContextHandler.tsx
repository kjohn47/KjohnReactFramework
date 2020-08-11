import { useContext } from "react";
import { AppContext } from "../../config/AppProvider";

const useAppHandler = () => {
    const appContext = useContext(AppContext);
    return {...appContext}
}

export default useAppHandler;