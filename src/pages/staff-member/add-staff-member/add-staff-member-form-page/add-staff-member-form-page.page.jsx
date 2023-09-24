import { Button, Grid } from "@mui/material";
import { FormInput } from "../../../../components/form/form-input/form-input.component";
import useFormHook from "../../../../components/input-form-hook/input-form-hook.component";
import { FormSelect } from "../../../../components/form/form-select/form-select.component";

const AddStaffMemberFormPage = () => {
  const { formFields, handleChange, resetFormFields } = useFormHook({});
  const { fullName, gender, dob, role } = formFields;
  return (
    <>
      <h1>ADD STAFF MEMBER PAGE</h1>
      <div className="my-5 mx-5">
        <form onSubmit={"handleSubmit"}>
          <Grid container spacing={7}>
            <FormSelect
              lable="Role"
              name="role"
              value={role}
              onChange={handleChange}
              optionsArray={[
                ["Doctor", "doctor"],
                ["Nurse", "nurse"],
                ["Other", "other"],
              ]}
              style={{ minWidth: 200 }}
            />
            <FormInput
              lable="Full Name"
              required
              type="text"
              name="fullName"
              value={fullName}
              onChange={handleChange}
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
              lable="dateOfBirth"
              required
              type="date"
              name="dob"
              value={dob}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid container justifyContent="center">
            <Button className="mt-5" variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default AddStaffMemberFormPage;
