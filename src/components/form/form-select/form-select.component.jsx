import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

export const FormSelect = ({ lable, name, value, onChange, optionsArray }) => {
  return (
    <Grid item>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-autowidth-label">{lable}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          name={name}
          value={value}
          label={lable}
          onChange={onChange}
        >
          {optionsArray.map((option, index) => {
            return (
              <MenuItem key={index} value={option[1]}>
                {option[0]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};
