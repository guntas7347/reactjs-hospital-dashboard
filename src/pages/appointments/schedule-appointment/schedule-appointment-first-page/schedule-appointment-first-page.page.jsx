import { Button, Container, Row } from "react-bootstrap";
import PatientBasicInfoCard from "../../../../components/patients/patient-profile-card/patient-info-card.component";
import DoctorInfoCard from "../../../../components/doctor-info-card/doctor-info-card.component";
import AppointmentPatientSearchBar from "../../../../components/patients/appointment-patient-search-bar/appointment-patient-search-bar.component";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ScheduleAppointmentFirstPage = () => {
  const navigate = useNavigate();
  const handlePatientChild = useRef();
  const handleDoctorChild = useRef();
  const patientBasicInformation = useSelector((state) => state.patient.patient);

  const shouldRenderComponent = patientBasicInformation.name; //// patientBasicInformation's default value is {}. So if try to get a value from an empty,
  // we get null rendering AppointmentPatientSearchBar and rendering Container if the object has a value

  const handleClick = async () => {
    handlePatientChild.current.dispatchPatientDetails();
    handleDoctorChild.current.dispatchAppointentDetails();
    navigate("/appointments/select-date-and-time");
  };

  return (
    <div>
      {shouldRenderComponent ? (
        <Container className="my-5 px-3">
          <Row>
            <PatientBasicInfoCard
              ref={handlePatientChild}
              patientBasicInformation={patientBasicInformation}
            />
            <DoctorInfoCard ref={handleDoctorChild} myFunction={handleClick} />
          </Row>

          <Row></Row>

          <Button className="d-flex mt-4 mx-auto" onClick={handleClick}>
            Continue
          </Button>
        </Container>
      ) : (
        <AppointmentPatientSearchBar />
      )}
    </div>
  );
};

export default ScheduleAppointmentFirstPage;
