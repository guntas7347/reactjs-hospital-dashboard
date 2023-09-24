import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setPatientData } from "../../../store/patient/patient.action";
import { searchPatientByUID } from "../../../utils/firebase/firebase";

const AppointmentPatientSearchBar = () => {
  const dispatch = useDispatch();

  const defaultFormFields = { paramValue: "" };
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { paramValue } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleClick = async () => {
    const res = await searchPatientByUID(formFields);
    if (res !== undefined) {
      dispatch(setPatientData(res[0]));
    } else {
      dispatch(setPatientData({}));
    }
  };

  return (
    <InputGroup as="div" className="w-50 mx-auto my-3">
      <Form.Control
        name="paramValue"
        value={paramValue}
        placeholder="Patient's Phone Number"
        onChange={handleChange}
      />
      <Button onClick={handleClick}>Search Patient</Button>
    </InputGroup>
  );
};

export default AppointmentPatientSearchBar;
