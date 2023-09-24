import { Button, Col, Form, Row, Table } from "react-bootstrap";
import useFormHook from "../../../../components/input-form-hook/input-form-hook.component";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  addAppointmentAvalabilitySlots,
  addDoctorAvalability,
} from "../../../../utils/firebase/firebase";

import "./date-picker.css";

const AddAvalabilityPage = () => {
  const { formFields, handleChange, resetFormFields } = useFormHook({});
  const { date, startTime, endTime } = formFields;

  const [slotArray, setSlotArray] = useState([]);

  const handleAddSlot = (event) => {
    event.preventDefault();

    const appointmentAvalabilityDocument = {
      date: date,
      timeSlots: generateTimeSlots(startTime, endTime).map((slot) => {
        return { time: slot, status: "available" };
      }),
    };
    setSlotArray([
      ...slotArray,
      { slotBrief: formFields, slot: appointmentAvalabilityDocument },
    ]);
  };

  const generateTimeSlots = (startTime, endTime) => {
    const timeSlots = [];
    const interval = 15; // 15 minutes

    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    while (start <= end) {
      const hours = start.getHours().toString().padStart(2, "0");
      const minutes = start.getMinutes().toString().padStart(2, "0");
      timeSlots.push(`${hours}:${minutes}`);
      start.setTime(start.getTime() + interval * 60000);
    }

    return timeSlots;
  };

  const handleClick = () => {
    addAppointmentAvalabilitySlots(slotArray)
      .then((res) => {
        setSlotArray([]);
        alert("Slots Added Successfully");
      })
      .catch((error) => {
        alert("Error Occured");
      });
  };

  return (
    <div className="mx-5 my-3">
      <Form onSubmit={handleAddSlot}>
        <Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Select Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Start time</Form.Label>
            <Form.Control
              type="time"
              name="startTime"
              value={startTime}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>End time</Form.Label>
            <Form.Control
              type="time"
              name="endTime"
              value={endTime}
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            type="submit"
            className="btn-sm mt-5"
            style={{ height: "10%", width: "10%" }}
          >
            Add Slot
          </Button>
        </Row>
      </Form>
      <Table responsive striped bordered hover variant="dark" className="my-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {slotArray.map((slot) => {
            const { date, startTime, endTime } = slot.slotBrief;
            return (
              <tr key={date + startTime}>
                <td>{date}</td>
                <td>{startTime}</td>
                <td>{endTime}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button onClick={handleClick}>Save Data</Button>
    </div>
  );
};

export default AddAvalabilityPage;
