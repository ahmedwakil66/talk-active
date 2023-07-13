import { createBrowserRouter } from "react-router-dom";
import FirstLayout from "../layouts/FirstLayout";
import Conversation from "../pages/Conversation/Conversation";
import SecondLayout from "../layouts/SecondLayout";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import ConversationWelcomeAndInfo from "../components/ConversationWelcomeAndInfo/ConversationWelcomeAndInfo";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute><FirstLayout /></PrivateRoute>,
        children: [
            {
                path: '/',
                element: <SecondLayout />,
                children: [
                    {
                        path: '/',
                        element: <ConversationWelcomeAndInfo />
                    },
                    {
                        path: '/chat/:receiverId',
                        element: <Conversation />
                    },
                ]
            },
        ]
    },
    {
        path: '/sign-in',
        element: <SignIn />
    },
    {
        path: '/sign-up',
        element: <SignUp />
    },
])

export default router;