import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { addNewPatient } from "../../../utils/firebase/firebase";
import useFormHook from "../../input-form-hook/input-form-hook.component";

const AddPatientForm = () => {
  const defaultFormFields = {
    name: "",
    fathersName: "",
    gender: "Male",
    dob: "",
    address: "",
    brief: "",
    phoneNumber: "",
    dateCreated: new Date(),
  };

  const { formFields, handleChange, resetFormFields } =
    useFormHook(defaultFormFields);

  const { name, fathersName, gender, dob, address, brief, phoneNumber } =
    formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addNewPatient(formFields).then(() => {
      resetFormFields(defaultFormFields);
      alert("Patient added successfully");
    });
  };

  return (
    <div className="my-5 mx-5">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Name</Form.Label>
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
              name="fathersName"
              value={fathersName}
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
          <Form.Group as={Col} md="4">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              required
              type="number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button className="mt-4" type="submit">
          Submit form
        </Button>
      </Form>
    </div>
  );
};

export default AddPatientForm;
