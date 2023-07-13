import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/utilityComps/Loader/Loader";

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, loading } = useAuth();

    if (loading) {
        return <Loader />
    }

    if (!user) {
        navigate('/sign-in', {state: {from: location}})
    }

    return children;
};

export default PrivateRoute;