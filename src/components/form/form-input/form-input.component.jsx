import { Grid, TextField } from "@mui/material";

export const FormInput = ({
  lable,
  name,
  type,
  value,
  onChange,
  ...otherProps
}) => {
  return (
    <Grid item>
      <TextField
        id="outlined-helperText"
        label={lable}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        margin="normal"
        {...otherProps}
      />
    </Grid>
  );
};
