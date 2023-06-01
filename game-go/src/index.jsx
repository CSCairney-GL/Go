import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Board from "./components/board/Board.jsx";
import Root from "./components/root/root.jsx";
import ErrorPage from "./components/errorPage/error-page.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path:"game",
        element: <Board />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);