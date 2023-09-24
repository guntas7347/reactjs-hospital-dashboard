import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  getAllPatients,
  searchPatientByParam,
  searchPatientByUID,
} from "../../../utils/firebase/firebase";
import { setPatientsList } from "../../../store/patients-list/patients-list.action";
import TableHeadComponent from "../../../components/table/table-head/table-head.component";
import { FormInput } from "../../../components/form/form-input/form-input.component";
import { FormSelect } from "../../../components/form/form-select/form-select.component";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableContainer,
} from "@mui/material";
import TableBodyComponent from "../../../components/table/table-body/table-body.component";
import useFormHook from "../../../components/input-form-hook/input-form-hook.component";
import { rearrangeObjectKeys } from "../../../utils/functions";
import { Outlet } from "react-router-dom";

const SearchPatientsPage = () => {
  const dispatch = useDispatch();

  const defaultSearchParam = {
    paramType: "patientUid",
    paramValue: "",
  };

  const patientsArray = useSelector((state) => state.patientsList.patientsList);

  const { formFields, handleChange, resetFormFields } =
    useFormHook(defaultSearchParam);

  const { paramType, paramValue } = formFields;

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const ress = await getAllPatients();
    var array = [];
    ress.forEach((obj) => {
      const newObj = rearrangeObjectKeys(obj, [
        "patientUID",
        "fullName",
        "gender",
        "dob",
      ]);
      array.push(Object.values(newObj));
    });
    dispatch(setPatientsList(array));

    // switch (formFields.paramType) {
    //   case "fetchAllPatients":
    //     const ress = await getAllPatients();
    //     dispatch(setPatientsList(ress));
    //     break;

    //   case "phoneNumber":
    //     const res = await searchPatientByUID(formFields);
    //     if (res[0]) {
    //       dispatch(setPatientsList(res));
    //     }

    //     break;

    //   default:
    //     const resss = await searchPatientByParam(formFields);
    //     dispatch(setPatientsList(resss));
    //     break;
    // }

    setIsLoading(false);
  };

  return (
    <div className="mx-5">
      <div className="my-3">
        <Grid container spacing={5}>
          <FormSelect
            lable="Parameter"
            name="paramType"
            value={paramType}
            onChange={handleChange}
            optionsArray={[
              ["Patient UID", "patientUID"],
              ["Name", "fullname"],
              ["Phone Number", "phoneNumber"],
              ["Fetch All Patients", "fetchAllPatients"],
            ]}
            style={{ minWidth: 200 }}
          />
          {formFields.paramType === "fetchAllPatients" ? (
            ""
          ) : (
            <FormInput
              required
              type="text"
              name="paramValue"
              value={paramValue}
              onChange={handleChange}
            />
          )}
        </Grid>

        <Button variant="contained" className="float-end" onClick={handleClick}>
          Fetch Patients
        </Button>
      </div>
      {isLoading ? (
        <CircularProgress className="d-flex mx-auto my-5" />
      ) : (
        <Paper className="mt-5">
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHeadComponent
                headingsArray={["UID", "Name", "Gender", "Date Of Birth"]}
              />
              <TableBodyComponent bodyArray={patientsArray} />
            </Table>
          </TableContainer>
        </Paper>
      )}{" "}
      <Outlet />
    </div>
  );
};

export default SearchPatientsPage;
