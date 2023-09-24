import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { patientReducer } from "./patient/patient.reducer";
import { patientsListReducer } from "./patients-list/patients-list.reducer";
import { bookAppointentReducer } from "./book-appointment/book-appointment.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  patient: patientReducer,
  patientsList: patientsListReducer,
  bookAppointment: bookAppointentReducer,
});
