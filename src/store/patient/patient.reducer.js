import { PATIENT_ACTION_TYPE } from "./patient.types";

const INITIAL_STATE = {
  patient: {},
};

export const patientReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case PATIENT_ACTION_TYPE.SET_PATIENT:
      return { ...state, patient: payload };

    default:
      return { ...state };
  }
};
