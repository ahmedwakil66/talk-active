import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../utilities/URLs";

const axiosSecure = axios.create({
    baseURL: baseUrl,
})

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        axiosSecure.interceptors.request.use(async(config) => {
            const token = await waitForToken();
            // const token = localStorage.getItem('talkActive-token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config
        })

        axiosSecure.interceptors.response.use(response => response, async (error) => {
            console.log('axios error', error);
            if (error.response && error.response.status === 401) {
                logOut()
                    .then(() => {
                        // toast('Session expired');
                        navigate('/sign-in', { state: { from: location } });
                    })
                    .catch(error => toast.error(error.message))
            }
            return Promise.reject(error);
        })
    }, [location, logOut, navigate])

    return { axiosSecure }
};

function waitForToken() {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('talkActive-token');
        if (token) {
            resolve(token);
        } else {
            const tokenCheckInterval = setInterval(() => {
                const updatedToken = localStorage.getItem('talkActive-token');
                if (updatedToken) {
                    clearInterval(tokenCheckInterval);
                    resolve(updatedToken);
                }
            }, 100);
        }
    });
}


export default useAxiosSecure;