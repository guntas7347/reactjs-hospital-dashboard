import { signOutFunction } from "../../utils/firebase/firebase";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import styled from "@emotion/styled";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const NavigationBar = () => {
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSignOut = async () => {
    await signOutFunction();
    navigate("/");
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <AppBar position="relative">
          <Toolbar>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography sx={{ flexGrow: 1 }}>Dashboard</Typography>
            <Button color="inherit" onClick={handleSignOut}>
              Signout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={isDrawerOpen}
        >
          <DrawerHeader>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem>
              <ListItem button component={Link} to="/admin">
                <ListItemText primary="Dashboard" />
              </ListItem>
            </ListItem>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Patients</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ListItem
                  button
                  component={Link}
                  to="/admin/patients/search-patients"
                >
                  <ListItemText primary="Search Patients" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/admin/patients/add-patient"
                >
                  <ListItemText primary="Add Patient" />
                </ListItem>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Appointmets</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ListItem button component={Link} to="/admin/appointments">
                  <ListItemText primary="Book Appointment" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/admin/appointments/view-appointments"
                >
                  <ListItemText primary="View Appointents" />
                </ListItem>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Staff Members</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ListItem
                  button
                  component={Link}
                  to="/admin/staff/add-staff-member"
                >
                  <ListItemText primary="Add Staff Member" />
                </ListItem>
              </AccordionDetails>
            </Accordion>
          </List>
        </Drawer>
      </Box>
    </Fragment>
  );
};

export default NavigationBar;
