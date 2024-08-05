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
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/register";
import Posts from "./pages/admin/posts";
import AbusiveReport from "./pages/admin/abuse-report";
import Home from "./pages/home";
import { IUser } from "./types/user.type";
import { IRole } from "./types/base.type";
import './App.css'
function App() {
  const { user } = useAuth();

  const AuthRoute = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      return <Outlet />;
    }
    return <Navigate to="/" />;
  };

  const AdminRoute = () => {
    const user : IUser = JSON.parse(sessionStorage.getItem("user") || "");
    if(!user){
      return <Navigate to="/" />;
    }else{
      const role : IRole[] = user.roles.filter(role => {
        return role.name == "ADMIN"
    })
    if(role.length == 0){
      return <Navigate to="/" />;
    }else{
      return <Outlet />;
    }
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        {/*<Route path="/on-boarding/set-up-password" element={<SetupPassword />} />*/}
        {/* <Route path="/on-boarding/set-up-profile" element={<SetupProfile />} /> */}
        <Route element={<AuthRoute />}>
          <Route element={<AdminRoute />} >
           <Route path="/account" element={<AccountIndex />} />
           <Route path="/users" element={<Users />} />
           <Route path="/posts" element={<Posts />} />
           <Route path="/report" element={<AbusiveReport />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
