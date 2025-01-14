import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequiredAuth } from "./routes/layout/Layout";
import HomePage from "./routes/home/HomePage";
import ListPage from "./routes/listPage/ListPage";
import Login from "./routes/login/Login";
import { SinglePage } from "./routes/singlePage/SinglePage";
import ProfilePage from "./routes/profilePage/ProfilePage";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdate";
import NewPostPage from "./routes/newPostPage/NewPostPage";
import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from "./lib/loaders";
import PaymentButton from "./routes/payment/PaymentButton";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/login",
          element: <Login />,
        },

        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
      ],
    },
    {
      path: "/",
      element: <RequiredAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        {
          path: "/updateProfile",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
        // {
        //   path: "/payment",
        //   element: <PaymentButton />,
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
