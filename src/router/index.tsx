import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Notifications from "../pages/Notifications";
import Messages from "../pages/Messages";
import Bookmarks from "../pages/Bookmarks";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/explore",
                element: <Explore />,
            },
            {
                path: "/notifications",
                element: <Notifications />,
            },
            {
                path: "/messages",
                element: <Messages />,
            },
            {
                path: "/bookmarks",
                element: <Bookmarks />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
        ]
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);