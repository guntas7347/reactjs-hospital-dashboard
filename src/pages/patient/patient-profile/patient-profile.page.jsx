import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import PatientProfileEditForm from "../../../components/patient/patient-profile-edit-form/patient-profile-edit-form.component";
import ChangePasswordFormPage from "../../authentication/change-password-form-page/change-password-form.page";
import { useState } from "react";

const ConditionalRendering = ({ subPageToLoad }) => {
  switch (subPageToLoad) {
    case "password":
      return <ChangePasswordFormPage />;

    default:
      return <PatientProfileEditForm />;
  }
};

const PatientPatientPage = () => {
  const [subPageToLoad, setSubPageToLoad] = useState("profile");

  const handleChange = (event) => {
    setSubPageToLoad(event.currentTarget.value);
  };

  return (
    <div>
      <div className="m-5">
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={subPageToLoad}
          onChange={handleChange}
        >
          <ToggleButton value="profile">Profile</ToggleButton>
          <ToggleButton value="password">Password</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <ConditionalRendering subPageToLoad={subPageToLoad} />
    </div>
  );
};

export default PatientPatientPage;
