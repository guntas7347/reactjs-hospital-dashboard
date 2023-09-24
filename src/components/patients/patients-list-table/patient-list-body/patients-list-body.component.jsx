import { Link } from "react-router-dom";
import { calculateAge } from "../../../../utils/functions";
import { useDispatch } from "react-redux";
import { setPatientData } from "../../../../store/patient/patient.action";

const PatientListBody = ({ patientsArray }) => {
  const dispatch = useDispatch();

  return (
    <tbody>
      {patientsArray.map((patient) => {
        const handleClick = () => {
          console.log(`get patient profile for ${phoneNumber}`);
        };
        const { name, fathersName, gender, dob, phoneNumber } = patient;
        return (
          <tr key={phoneNumber}>
            <td></td>
            <td>
              <Link to="patient-profile" onClick={handleClick}>
                {name}
              </Link>
            </td>
            <td>{fathersName}</td>
            <td>{gender}</td>
            <td>{calculateAge(dob)} years</td>
            <td>{phoneNumber}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default PatientListBody;
