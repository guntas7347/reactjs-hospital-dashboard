import useFormHook from "../../../components/input-form-hook/input-form-hook.component";
import { addNewPatient } from "../../../utils/firebase/firebase";
import { FormInput } from "../../../components/form/form-input/form-input.component";
import { FormSelect } from "../../../components/form/form-select/form-select.component";
import { Button, Grid } from "@mui/material";

const AddPatientPage = () => {
  const defaultFormFields = {
    fullName: "",
    dob: "",
    fathersName: "",
    gender: "male",
    email: "",
    address: "",
    phoneNumber: "",
    emergencyContactName: "",
    emergencyContactPhoneNumber: "",
    dateCreated: new Date(),
  };

  const { formFields, handleChange, resetFormFields } =
    useFormHook(defaultFormFields);

  const {
    fullName,
    dob,
    fathersName,
    gender,
    email,
    address,
    phoneNumber,
    emergencyContactName,
    emergencyContactPhoneNumber,
  } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    addNewPatient(formFields).then((doc) => {
      resetFormFields(defaultFormFields);
      alert("Patient created successfully");
    });
  };

  return (
    <div className="my-5 mx-5">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={7}>
          <FormInput
            lable="Full Name"
            required
            type="text"
            name="fullName"
            value={fullName}
            onChange={handleChange}
          />
          <FormInput
            lable="Father's Name"
            required
            type="text"
            name="fathersName"
            value={fathersName}
            onChange={handleChange}
          />
          <FormInput
            lable="Date of birth"
            required
            type="date"
            name="dob"
            value={dob}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            style={{ minWidth: 200 }}
          />
          <FormSelect
            lable="Gender"
            name="gender"
            value={gender}
            onChange={handleChange}
            optionsArray={[
              ["Male", "male"],
              ["Female", "female"],
              ["Other", "other"],
            ]}
            style={{ minWidth: 200 }}
          />

          <FormInput
            lable="Email"
            required
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />

          <FormInput
            lable="Phone Number"
            required
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
          />
          <FormInput
            lable="Address"
            required
            type="text"
            placeholder="Address"
            name="address"
            value={address}
            onChange={handleChange}
          />

          <FormInput
            lable="Emergency Contact Name"
            required
            type="text"
            name="emergencyContactName"
            value={emergencyContactName}
            onChange={handleChange}
          />
          <FormInput
            lable="Emergency Contact Phone Number"
            required
            type="text"
            name="emergencyContactPhoneNumber"
            value={emergencyContactPhoneNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid container justifyContent="center">
          <Button
            className="mt-5"
            variant="contained"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatientPage;
