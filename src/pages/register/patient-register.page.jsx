import * as React from "react";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PatientRegisterCredentialsForm from "./credentials-form/patient-register-credentials-form.page";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        Guntas Cardic Hospital
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const PatientRegister = () => {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <PatientRegisterCredentialsForm />
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default PatientRegister;
