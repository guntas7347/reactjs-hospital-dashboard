import { Route, Routes } from "react-router-dom";
import PatientNavigationBar from "../../components/navbar/patient-navbar.component";
import PatientPatientPage from "../../pages/patient/patient-profile/patient-profile.page";

const PatientDashboard = () => {
  return (
    <>
      <PatientNavigationBar />
      <Routes>
        <Route path="profile" element={<PatientPatientPage />}></Route>
      </Routes>
    </>
  );
};

export default PatientDashboard;
