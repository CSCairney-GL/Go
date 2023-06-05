import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./components/root/root.jsx";
import ErrorPage from "./components/errorPage/error-page.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Game from "./pages/game.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path:"game",
        element: <Game/>,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);