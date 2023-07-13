import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/utilityComps/Loader/Loader";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, loading } = useAuth();
    const [serverNotUp, setServerNotUp] = useState(true);

    useEffect(() => {
        fetch('https://talk-active-ca.onrender.com/')
            .then(res => res.json())
            .then(data => {
                if(data && data.server === 'awake'){
                    setServerNotUp(false);
                }
            })
            .catch(error => console.log(error))
    }, [])

    if(serverNotUp){
        return <Loader text='Checking server status... This may take a while'/>
    }

    if (loading) {
        return <Loader />
    }

    if (!user) {
        navigate('/sign-in', { state: { from: location } })
    }

    return children;
};

export default PrivateRoute;