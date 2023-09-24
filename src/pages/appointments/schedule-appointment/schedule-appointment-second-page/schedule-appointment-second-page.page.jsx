import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAppointmentDetails } from "../../../../store/book-appointment/book-appointment.selector";
import { scheduleAppointment } from "../../../../utils/firebase/firebase";
import {
  dateObjToDate,
  dateObjToFormattedDate,
} from "../../../../utils/functions";

const ScheduleAppointmentSecondPage = () => {
  const { appointmentDetails, patientDetails } = useSelector(
    getAppointmentDetails
  );

  const { name, fathersName, gender, dob, phoneNumber } =
    patientDetails.patientBasicInformation;
  const {
    fullName,
    specialization,
    availability,
    consultationFee,
    department,
  } = appointmentDetails.doctorDetails;
  const { appointmentDate } = appointmentDetails;

  const handleClick = async () => {
    const appointmentDoc = {
      patientUID: phoneNumber,
      doctorUID: appointmentDetails.doctorDetails.phoneNumber,
      status: "confirmed",
      appointmentDate: dateObjToDate(appointmentDate),
      appointmentPurpose: patientDetails.appointmentPurpose,
    };
    await scheduleAppointment(appointmentDoc)
      .then((res) => {
        alert("Booking Successful, Time Slot: " + res);
      })
      .catch((error) => {});
  };

  return (
    <div>
      <Container>
        <Row>
          <Card as={Col} className="mx-2 my-2">
            <Table>
              <tbody>
                <tr>
                  <th>Patient name</th>
                  <td>{name}</td>
                </tr>
                <tr>
                  <th>Father's name</th>
                  <td>{fathersName}</td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>{gender}</td>
                </tr>
                <tr>
                  <th>Age</th>
                  <td>{dob}</td>
                </tr>
                <tr>
                  <th>Phone Number</th>
                  <td>{phoneNumber}</td>
                </tr>
                <tr>
                  <th>Appointment Purpose</th>
                  <td>{patientDetails.appointmentPurpose}</td>
                </tr>
              </tbody>
            </Table>
          </Card>
          <Card as={Col} className="my-2 mx-2">
            <Table>
              <tbody>
                <tr>
                  <th>Doctor's name</th>
                  <td>{fullName}</td>
                </tr>
                <tr>
                  <th>Specialisation</th>
                  <td>{specialization}</td>
                </tr>
                <tr>
                  <th>Availability</th>
                  <td>{availability}</td>
                </tr>
                <tr>
                  <th>Consultation Fee</th>
                  <td>{consultationFee}</td>
                </tr>
                <tr>
                  <th>Brief Description</th>
                  <td>{department}</td>
                </tr>
                <tr>
                  <th>Appointment Date</th>
                  <td>{dateObjToFormattedDate(appointmentDate)}</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Row>
      </Container>
      <Button onClick={handleClick} className="d-flex mt-4 mx-auto">
        Book Now
      </Button>
    </div>
  );
};

export default ScheduleAppointmentSecondPage;
