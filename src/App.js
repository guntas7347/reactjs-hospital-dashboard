import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";

import { selectCurrentUser } from "./store/user/user.selector";
import AdminDashboard from "./routes/dashboard/dashboard.routes";
import { useAuthentication } from "./utils/hooks/authentication/authentication-hook";
import HomeRoute from "./routes/home/home.routes";
import PatientRegister from "./pages/register/patient-register.page";
import SignInPage from "./pages/sign-in-page/sign-in.page";
import PatientDashboard from "./routes/patient/patient-dashboard";
import FourZeroFourPage from "./pages/errors/404-page/404.page";
import DoctorDashboard from "./routes/doctor/doctor-dashboard.route";

const ProtectedRoute = ({ currentUser, role, element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role !== role) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [currentUser]);

  if (currentUser) {
    if (currentUser.role === role) {
      return element;
    }
  } else {
    return <FourZeroFourPage />;
  }
};

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { authListener } = useAuthentication(dispatch);

  useEffect(() => {
    authListener();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="register" element={<PatientRegister />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route
        path="/patient/*"
        element={
          <ProtectedRoute
            currentUser={currentUser}
            role="PATIENT"
            element={<PatientDashboard />}
          />
        }
      />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute
            currentUser={currentUser}
            role="ADMIN"
            element={<AdminDashboard />}
          />
        }
      />
      <Route
        path="/doctor/*"
        element={
          <ProtectedRoute
            currentUser={currentUser}
            role="DOCTOR"
            element={<DoctorDashboard />}
          />
        }
      />
    </Routes>
  );
};

export default App;
