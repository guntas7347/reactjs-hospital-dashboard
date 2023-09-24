import { PATIENTS_LIST_TYPES } from "./patients-list.types";

export const setPatientsList = (payload) => {
  return { type: PATIENTS_LIST_TYPES.SET_PATIENTS_LIST, payload: payload };
};
