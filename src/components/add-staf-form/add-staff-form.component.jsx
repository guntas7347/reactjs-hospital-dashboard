import { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import useFormHook from "../input-form-hook/input-form-hook.component";
import { defaultFormFields } from "./add-staff-form.component.function";
import { addStaffMember } from "../../utils/firebase/firebase";

const AddStaffForm = () => {
  const { formFields, handleChange, resetFormFields } =
    useFormHook(defaultFormFields);

  const {
    fullName,
    gender,
    dateOfBirth,
    email,
    phoneNumber,
    role,
    specialization,
    department,
    medicalLicenseNumber,
    certification,
    availability,
    daysOff,
    residentialAddress,
    emergencyContactName,
    emergencyContactNumber,
    username,
    additionalNotes,
    profilePicture,
  } = formFields;

  const inputFieldsArray = [
    {
      name: "fullName",
      value: fullName,
      placeHolder: "Full Name",
      type: "text",
    },
    {
      name: "gender",
      value: gender,
      placeHolder: "Gender",
      type: "select",
      options: ["Male", "Female", "Others"],
    },
    {
      name: "dateOfBirth",
      value: dateOfBirth,
      placeHolder: "Date of Birth",
      type: "date",
    },
    {
      name: "email",
      value: email,
      placeHolder: "Email",
      type: "email",
    },
    {
      name: "phoneNumber",
      value: phoneNumber,
      placeHolder: "Phone Number",
      type: "tel",
    },
    {
      name: "role",
      value: role,
      placeHolder: "Role",
      type: "text",
      options: ["Doctor", "Nurse"],
    },
    {
      name: "specialization",
      value: specialization,
      placeHolder: "Specialization",
      type: "text",
    },
    {
      name: "department",
      value: department,
      placeHolder: "Department",
      type: "text",
    },
    {
      name: "medicalLicenseNumber",
      value: medicalLicenseNumber,
      placeHolder: "Medical License Number",
      type: "text",
    },
    {
      name: "certification",
      value: certification,
      placeHolder: "Certification",
      type: "text",
    },
    {
      name: "availability",
      value: availability,
      placeHolder: "Availability",
      type: "text",
    },
    {
      name: "daysOff",
      value: daysOff,
      placeHolder: "Days Off",
      type: "text",
    },
    {
      name: "residentialAddress",
      value: residentialAddress,
      placeHolder: "Residential Address",
      type: "text",
    },
    {
      name: "emergencyContactName",
      value: emergencyContactName,
      placeHolder: "Emergency Contact Name",
      type: "text",
    },
    {
      name: "emergencyContactNumber",
      value: emergencyContactNumber,
      placeHolder: "Emergency Contact Number",
      type: "tel",
    },
    {
      name: "username",
      value: username,
      placeHolder: "Username",
      type: "text",
    },
    {
      name: "additionalNotes",
      value: additionalNotes,
      placeHolder: "Additional Notes",
      type: "text",
    },
    // {
    //   name: "profilePicture",
    //   value: profilePicture,
    //   placeHolder: "Profile Picture",
    //   type: "file",
    // },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addStaffMember(formFields).then((res) =>
      alert("Staff Member Added Successfully")
    );
    resetFormFields(defaultFormFields);
  };
  return (
    <div className="my-5 mx-5">
      <h1>ADD STAFF MEMBER</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          {inputFieldsArray.map((input) => {
            const { name, value, placeHolder, type, options } = input;
            return (
              <Fragment>
                <Form.Group className="my-2" as={Col} md="3" lg="2">
                  {options ? (
                    <div>
                      <Form.Label>{placeHolder}</Form.Label>
                      <Form.Select
                        name={name}
                        value={value}
                        onChange={handleChange}
                      >
                        {options.map((option) => {
                          return <option>{option}</option>;
                        })}
                      </Form.Select>
                    </div>
                  ) : (
                    <div>
                      <Form.Label>{placeHolder}</Form.Label>
                      <Form.Control
                        required
                        type={type}
                        name={name}
                        value={value}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  <div></div>
                </Form.Group>
              </Fragment>
            );
          })}
        </Row>
        <Button className="d-flex mt-4 mx-auto" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddStaffForm;
