import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Cart from "./pages/Cart";
// import Complains from './pages/Complains'
// import Profile from './pages/Profile'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
       {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "/",

        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
