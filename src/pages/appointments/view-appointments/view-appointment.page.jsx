import { Button, Table } from "react-bootstrap";
import TableHeadComponent from "../../../components/table/table-head/table-head.component";
import TableBodyComponent from "../../../components/table/table-body/table-body.component";
import { getAllAppointments } from "../../../utils/firebase/firebase";
import { useState } from "react";
import {
  convertTo12HourFormat,
  dateObjToFormattedDate,
  rearrangeObjectKeys,
} from "../../../utils/functions";

const ViewAppointmentsPage = () => {
  const [appointments, setAppointmenmts] = useState([]);

  const handleClick = () => {
    const objectKeysOrder = [
      "patientUID",
      "doctorUID",
      "appointmentPurpose",
      "appointmentDate",
      "appointmentTime",
      "status",
    ];

    getAllAppointments().then((res) => {
      var myArray = [];
      res.forEach((obj) => {
        const rearrangedObject = rearrangeObjectKeys(obj, objectKeysOrder);
        rearrangedObject.appointmentDate = dateObjToFormattedDate(
          rearrangedObject.appointmentDate
        );
        rearrangedObject.appointmentTime = convertTo12HourFormat(
          rearrangedObject.appointmentTime
        );
        myArray.push(Object.values(rearrangedObject));
      });
      setAppointmenmts(myArray);
    });
  };

  return (
    <div className="mx-5 my-3">
      <Button className="my-2 ms-auto" onClick={handleClick}>
        Fetch Appointments
      </Button>
      <Table responsive striped bordered hover variant="dark" className="">
        <TableHeadComponent
          headingsArray={[
            "Patient UID",
            "Doctor UID",
            "Appointment Purpose",
            "Appointment Date",
            "Appointment Time",
            "Status",
          ]}
        />
        <TableBodyComponent bodyArray={appointments} />
      </Table>
    </div>
  );
};

export default ViewAppointmentsPage;
