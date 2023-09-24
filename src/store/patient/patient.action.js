import { PATIENT_ACTION_TYPE } from "./patient.types";

export const setPatientData = (patientData) => {
  return { type: PATIENT_ACTION_TYPE.SET_PATIENT, payload: patientData };
};
