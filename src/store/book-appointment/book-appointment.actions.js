import { BOOK_APPOINTMENT_TYPE } from "./book-appointment.types";

export const setPatientDetailsForBookAppointment = (patientDetails) => {
  return {
    type: BOOK_APPOINTMENT_TYPE.SET_PATIENT_DETALS,
    payload: patientDetails,
  };
};

export const setDoctorDetailsForBookAppointment = (doctorDetails) => {
  return {
    type: BOOK_APPOINTMENT_TYPE.SET_DOCTOR_DETAILS,
    payload: doctorDetails,
  };
};
