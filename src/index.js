import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import {createRoot} from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
