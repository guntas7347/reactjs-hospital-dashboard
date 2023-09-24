import { Outlet, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import NavigationBar from "../../components/navbar/navbar.component";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import HomePage from "../../pages/home-page/home-page.page";
import AddPatientPage from "../../pages/patients/add-patient/add-patient.page";
import SearchPatientsPage from "../../pages/patients/search-patients/search-patients.page";
import EditPatientPage from "../../pages/patients/edit-patient/edit-patient.page";
import PatientProfilePage from "../../pages/patients/patient-profile/patient-profile.page";
import ScheduleAppointmentFirstPage from "../../pages/appointments/schedule-appointment/schedule-appointment-first-page/schedule-appointment-first-page.page";
import ScheduleAppointmentSecondPage from "../../pages/appointments/schedule-appointment/schedule-appointment-second-page/schedule-appointment-second-page.page";
import ViewAppointmentsPage from "../../pages/appointments/view-appointments/view-appointment.page";
import AddStaffMemberFormPage from "../../pages/staff-member/add-staff-member/add-staff-member-form-page/add-staff-member-form-page.page";
import AddAvalabilityPage from "../../pages/staff-member/doctor/add-avalibility-page/add-avalability-page.page";
import Documentation from "../../pages/documentation/documentation.page";

const AdminDashboard = () => {
  return (
    <Fragment>
      <NavigationBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="patients">
          <Route path="add-patient" element={<AddPatientPage />} />
          <Route
            exact
            path="search-patients"
            element={<SearchPatientsPage />}
          />
          <Route path="edit-patient" element={<EditPatientPage />} />
          <Route path="patient-profile/*" element={<PatientProfilePage />} />
        </Route>
        <Route path="appointments" element={<ScheduleAppointmentFirstPage />}>
          <Route
            path="select-date-and-time"
            element={<ScheduleAppointmentSecondPage />}
          />
        </Route>

        <Route
          path="appointments/view-appointments"
          element={<ViewAppointmentsPage />}
        />
        <Route
          path="staff/add-staff-member"
          element={<AddStaffMemberFormPage />}
        />
        <Route
          path="staff/add-doctor-avalability"
          element={<AddAvalabilityPage />}
        />
        <Route path="documentation" element={<Documentation />} />
      </Routes>
    </Fragment>
  );
};

export default AdminDashboard;
