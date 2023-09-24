import { Button, Grid } from "@mui/material";
import { FormInput } from "../../../components/form/form-input/form-input.component";
import useFormHook from "../../../components/input-form-hook/input-form-hook.component";

const ChangePasswordFormPage = () => {
  const defaultFormFields = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const { formFields, handleChange } = useFormHook(defaultFormFields);
  const { oldPassword, newPassword, confirmNewPassword } = formFields;

  const handleSubmit = () => {
    console.log(formFields);
  };

  return (
    <div className="m-5">
      <Grid container spacing={7}>
        <FormInput
          lable="Old Password"
          required
          type="password"
          name="oldPassword"
          value={oldPassword}
          onChange={handleChange}
        />
        <FormInput
          lable="New Password"
          required
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={handleChange}
        />
        <FormInput
          lable="Confirm New Password"
          required
          type="password"
          name="confirmNewPassword"
          value={confirmNewPassword}
          onChange={handleChange}
        />
      </Grid>
      <Button
        className="mt-5"
        variant="contained"
        type="button"
        onClick={handleSubmit}
      >
        Confirm
      </Button>
    </div>
  );
};

export default ChangePasswordFormPage;
