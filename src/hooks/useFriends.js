import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useUser from "./useUser";

const useFriends = () => {
    const {loading} = useAuth();
    const {axiosSecure} = useAxiosSecure();
    const {userId} = useUser();

    const {data = [], isLoading} = useQuery({
        enabled: !loading && userId !== undefined,
        queryKey: ['friends', userId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/friends?userID=${userId}`);
            return res.data;
        }
    })

    return {data, isLoading}
};

export default useFriends;