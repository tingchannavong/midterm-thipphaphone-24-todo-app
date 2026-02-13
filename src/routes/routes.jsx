import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import TodoList from "../pages/TodoList";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: 'my-todo',
                element: <TodoList/>
            },
        ]
    }

])

export default routes;