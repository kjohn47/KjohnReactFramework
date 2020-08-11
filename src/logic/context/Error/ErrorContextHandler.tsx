import { useContext } from "react";
import { ErrorContext } from "../../config/AppProvider";

const useErrorHandler = () => {
    const errorContext = useContext(ErrorContext);
    return {...errorContext}
}

export default useErrorHandler;