import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";
import AccountIndex from "./pages/account";
import Users from "./pages/admin/users";
import Comments from "./pages/admin/comments";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/register";
import Posts from "./pages/admin/posts";
import AbusiveReport from "./pages/admin/abuse-report";
import Home from "./pages/home";

function App() {
  const { user } = useAuth();

  const AuthRoute = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      return <Outlet />;
    }
    return <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        {/*<Route path="/on-boarding/set-up-password" element={<SetupPassword />} />*/}
        {/* <Route path="/on-boarding/set-up-profile" element={<SetupProfile />} /> */}
        <Route element={<AuthRoute />}>
          <Route path="/account" element={<AccountIndex />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/report" element={<AbusiveReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
