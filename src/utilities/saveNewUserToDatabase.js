import { toast } from "react-hot-toast";
import { baseUrl } from "./URLs";

const saveNewUserToDatabase = async (newUser, toastId) => {
    let mongoData;

    await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(res => res.json())
        .then(data => {
            mongoData = data;
        })
        .catch(error => {
            toast.error(error.message, { id: toastId });
        })

        return mongoData;
}

export default saveNewUserToDatabase;