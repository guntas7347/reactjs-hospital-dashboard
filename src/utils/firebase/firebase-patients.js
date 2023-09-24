import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import {
  addNewPatient,
  auth,
  createUserRole,
  deleteUserRole,
} from "./firebase";

export const registerPatientWithEmailAndPassword = (credentials) => {
  const { email, password, fullName } = credentials;
  const patientDetails = {
    fullName: fullName,
    email: email,
    dateCreated: new Date(),
  };

  try {
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      createUserRole({ ...user, role: "PATIENT" }).then(() =>
        addNewPatient(patientDetails, user.uid)
      );
    });
  } catch (error) {
    deleteUser(auth.currentUser).then(() => {
      deleteUserRole(auth.currentUser.uid);
    });
  }
};
