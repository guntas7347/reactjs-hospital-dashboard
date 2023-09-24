import { forwardRef, useImperativeHandle, useState } from "react";
import { Card, Col, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setPatientDetailsForBookAppointment } from "../../../store/book-appointment/book-appointment.actions";

const PatientBasicInfoCard = forwardRef(({ patientBasicInformation }, ref) => {
  const dispatch = useDispatch();

  const { name, fathersName, gender, dob, phoneNumber } =
    patientBasicInformation;

  const defaultFormFields = {
    appointmentPurpose: "",
    phoneNumber: phoneNumber,
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { appointmentPurpose } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  useImperativeHandle(ref, () => ({
    dispatchPatientDetails: () => {
      dispatch(
        setPatientDetailsForBookAppointment({
          ...formFields,
          patientBasicInformation,
        })
      );
    },
  }));

  return (
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
            <td>
              <input
                type="text"
                value={appointmentPurpose}
                name="appointmentPurpose"
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
});

export default PatientBasicInfoCard;
