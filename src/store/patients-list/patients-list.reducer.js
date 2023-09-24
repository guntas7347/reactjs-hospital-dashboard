import { PATIENTS_LIST_TYPES } from "./patients-list.types";

const INITIAL_STATE = {
  patientsList: [],
};

export const patientsListReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case PATIENTS_LIST_TYPES.SET_PATIENTS_LIST:
      return { ...state, patientsList: payload };

    default:
      return { ...state };
  }
};
