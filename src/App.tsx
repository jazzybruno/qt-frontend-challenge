import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";
import AccountIndex from "./pages/account";
import DashboardIndex from "./pages/admin/dashboard";
import Users from "./pages/admin/users";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/register";
import EmployeeLaptopPage from "./pages/admin/employee";

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
        <Route path="/" element={<Login />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        {/*<Route path="/on-boarding/set-up-password" element={<SetupPassword />} />*/}
        {/* <Route path="/on-boarding/set-up-profile" element={<SetupProfile />} /> */}
        <Route element={<AuthRoute />}>
          <Route path="/account" element={<AccountIndex />} />
          <Route path="/employee" element={<EmployeeLaptopPage />} />
          <Route path="/dashboard" element={<DashboardIndex />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
