import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { searchPatientByUID } from "../../../utils/firebase/firebase";
import {
  dateObjToFormattedDate,
  rearrangeObjectKeys,
  renameObjectKeyForPatientProfile,
} from "../../../utils/functions";

const PatientProfilePage = () => {
  const patientUidParam = Object.values(useParams())[0];

  const [patientProfile, setPatientProfile] = useState({});
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
    patientUID,
  } = patientProfile;

  const getpatient = async () => {
    const patientDataObject = (
      await searchPatientByUID({ paramValue: patientUidParam })
    )[0];
    const newPatientDataObject = rearrangeObjectKeys(patientDataObject, [
      "patientUID",
      "fullName",
      "fathersName",
      "gender",
      "dob",
      "address",
    ]);

    setPatientProfile(newPatientDataObject);
  };

  useEffect(() => {
    getpatient();
  }, []);

  return (
    <div className="m-5">
      <div>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            className="mx-auto my-2"
            style={{ height: 90, width: 90, borderRadius: 75 }}
            image="https://www.w3schools.com/howto/img_avatar.png"
            alt="Patient IMG"
          />
          <CardContent>
            {Object.keys(patientProfile).map((element, index) => {
              return (
                <div key={index}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography
                        inline={true}
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: "bold" }}
                      >
                        {renameObjectKeyForPatientProfile(element)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        inline={true}
                        variant="body2"
                        color="text.secondary"
                      >
                        {patientProfile[element]}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientProfilePage;
