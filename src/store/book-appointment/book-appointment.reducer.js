import { BOOK_APPOINTMENT_TYPE } from "./book-appointment.types";

const INITIAL_STATE = {};

export const bookAppointentReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case BOOK_APPOINTMENT_TYPE.SET_PATIENT_DETALS:
      return { ...state, patientDetails: payload };

    case BOOK_APPOINTMENT_TYPE.SET_DOCTOR_DETAILS:
      return { ...state, appointmentDetails: payload };

    default:
      return { ...state };
  }
};
