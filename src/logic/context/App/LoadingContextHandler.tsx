import { useContext } from "react";
import { LoadingContext } from "../../config/AppProvider";

const useLoadingHandler = () => {
    const [loading, setLoading] = useContext(LoadingContext);
    return {
        loading,
        setLoading 
    }
}

export default useLoadingHandler;