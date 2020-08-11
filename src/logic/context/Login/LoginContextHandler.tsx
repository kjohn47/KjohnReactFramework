import { useContext } from "react";
import { LoginContext } from "../../config/AppProvider";

const useLoginHandler = () => {
    const loginContext = useContext(LoginContext);
    return {...loginContext}
}

export default useLoginHandler;