import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import QuizCreation from "./Composant/QuizCreation";
import QuizResults from "./Composant/QuizResults";

function RootLayout() {
    return (
        <>
            <main style={{ padding: "20px" }}>
                <Outlet />
            </main>
        </>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, path: "/", element: <QuizCreation /> },
            {path: "/results", element: <QuizResults /> },
        ],
    },
]);

export default router;