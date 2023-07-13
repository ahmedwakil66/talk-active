import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUser = () => {
    const {user, loading} = useAuth();
    const {axiosSecure} = useAxiosSecure();

    const {data = {}, isLoading, refetch} = useQuery({
        enabled: !loading,
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data;
        }
    })

    return {data, isLoading, userId: data._id, refetch}
};

export default useUser;