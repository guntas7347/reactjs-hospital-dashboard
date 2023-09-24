import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Card, Col, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setDoctorDetailsForBookAppointment } from "../../store/book-appointment/book-appointment.actions";

import DatePicker from "react-datepicker";
import {
  getAllDoctors,
  getAppointmentAvalability,
} from "../../utils/firebase/firebase";

const DoctorInfoCard = forwardRef((_, ref) => {
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    dispatchAppointentDetails: () => {
      const appointmentDetails = {
        doctorDetails: doctorData,
        appointmentDate: selectedDate,
      };
      dispatch(setDoctorDetailsForBookAppointment(appointmentDetails));
    },
  }));

  const defaultdoctorData = {
    specialty: "",
    availability: "",
    consultationFee: "",
    description: "",
  };

  const [doctorsDataArray, setDoctorsDataArray] = useState([]);

  const [doctorData, setdoctorData] = useState(defaultdoctorData);
  const { specialization, availability, consultationFee, department } =
    doctorData;

  const handleChange = (event) => {
    const { value } = event.target;
    const res = doctorsDataArray.find((doctor) => doctor.phoneNumber === value);
    if (res) {
      setdoctorData(res);

      getAppointmentAvalability(value).then((slotsArray) => {
        ////////////

        // const filteredSlotArray = () => {
        //   slotsArray.filter((item) => {
        //     return item.timeSlots.every((slot) => slot.status === "booked");
        //   });
        // };
        setAppointmentSlots(slotsArray);
      });
    } else {
      setdoctorData(defaultdoctorData);
    }
    setSelectedDate();
  };

  useEffect(() => {
    const getData = async () => {
      await getAllDoctors().then((res) => setDoctorsDataArray(res));
    };
    getData();
  }, []);

  const [selectedDate, setSelectedDate] = useState();
  const [appointmentSlots, setAppointmentSlots] = useState([]);
  const getAppointmentSlotDates = (appointmentSlots) => {
    return appointmentSlots.map((slot) => {
      return new Date(slot.date);
    });
  };

  return (
    <Card as={Col} className="my-2 mx-2">
      <Table>
        <tbody>
          <tr>
            <th>Doctor's name</th>
            <td>
              <select onChange={handleChange}>
                <option value={null}>Select a Doctor</option>
                {doctorsDataArray.map((doctor) => {
                  return (
                    <option key={doctor.phoneNumber} value={doctor.phoneNumber}>
                      {doctor.fullName}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <th>Specialisation</th>
            <td>{specialization}</td>
          </tr>
          <tr>
            <th>Availability</th>
            <td>{availability}</td>
          </tr>
          <tr>
            <th>Consultation Fee</th>
            <td>{consultationFee}</td>
          </tr>
          <tr>
            <th>Brief Description</th>
            <td>{department}</td>
          </tr>
          <tr>
            <th>Appointment Date</th>
            <td>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                minDate={new Date()}
                includeDates={getAppointmentSlotDates(appointmentSlots)}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
});

export default DoctorInfoCard;
