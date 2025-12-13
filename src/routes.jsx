import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
// import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile"
// import Alert from "./pages/Alert";
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
        element: <Login />,
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
        path: "profile",
        element: <Profile />,
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
