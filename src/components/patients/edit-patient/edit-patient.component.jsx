import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { editPatient, fetchPatient } from "../../../utils/firebase/firebase";

const EditPatientForm = () => {
  const defaultFormFields = {
    name: "",
    fathersname: "",
    gender: "Male",
    dob: "",
    address: "",
    brief: "",
    phoneNumber: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, fathersname, gender, dob, address, brief, phoneNumber } =
    formFields;

  const [isPhoneNumberDisabled, setisPhoneNumberDisabled] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmitForSave = async (event) => {
    event.preventDefault();
    await editPatient(phoneNumber, formFields);
    handleSubmitForClear();
  };

  const handleSubmitForSearch = async (event) => {
    event.preventDefault();
    if (phoneNumber) {
      setisPhoneNumberDisabled(true);
      const { phoneNumber } = formFields;
      const res = await fetchPatient(phoneNumber);
      if (res) {
        setFormFields(res);
      } else {
        handleSubmitForClear();
      }
    }
  };

  const handleSubmitForClear = () => {
    resetFormFields();
    setisPhoneNumberDisabled(false);
  };

  return (
    <div className="my-5 mx-5">
      <Form onSubmit={handleSubmitForSave}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Father's name</Form.Label>
            <Form.Control
              required
              type="text"
              name="fathersname"
              value={fathersname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Gender</Form.Label>
            <Form.Select name="gender" value={gender} onChange={handleChange}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>dob</Form.Label>
            <Form.Control
              required
              type="date"
              name="dob"
              value={dob}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Address"
              name="address"
              value={address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Brief</Form.Label>
            <Form.Control
              required
              type="text"
              name="brief"
              value={brief}
              onChange={handleChange}
            />
          </Form.Group>{" "}
        </Row>
        <Row className="md-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              required
              disabled={isPhoneNumberDisabled}
              type="number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
            />
            <Button
              className="btn-sm my-1 float-end"
              onClick={handleSubmitForSearch}
            >
              Search
            </Button>
            <Button
              className="btn-sm my-1 mx-1 float-end"
              variant="danger"
              onClick={handleSubmitForClear}
            >
              Clear
            </Button>
          </Form.Group>
        </Row>
        <Button className="d-flex mt-4 mx-auto" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default EditPatientForm;
