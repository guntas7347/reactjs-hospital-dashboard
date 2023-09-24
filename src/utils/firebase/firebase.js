import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  generateUidSequence,
  getYearAndMonthForGeneratingUID,
} from "../functions";

const firebaseConfig = {
  // your firebase api key
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const signInWithEmailAndPasswordFunction = async (credentials) => {
  const { email, password } = credentials;
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res;
};

export const signOutFunction = () => {
  return signOut(auth);
};

export const onAuthStateChangedListener = (callBack) => {
  onAuthStateChanged(auth, callBack);
};

const db = getFirestore(app);

export const createUserRole = async (user) => {
  try {
    const { email, uid, role } = user;
    const userRoleDocRef = doc(db, "authentication", uid);
    await setDoc(userRoleDocRef, { uid: uid, email: email, role: role });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserRole = async (userUID) => {
  try {
    const userRoleDocRef = doc(db, "authentication", userUID);
    await deleteDoc(userRoleDocRef);
  } catch (error) {
    console.log(error);
  }
};

const generatePatientUID = async () => {
  // Function to generate new Patient's UID. UID format P23HA01 where P=patient,23=year,H=8thMonth,A01=Patient sequence for P23H.

  const getLatestPatientUID = async () => {
    // Function to get latest Patient's UID.
    // Latest Patient means the last added patient before adding New Patient. Latest Patient's UID is required to generate sequential UID for New patient.

    try {
      const patientColRef = collection(
        db,
        "Patients Record",
        "Patients",
        "Basic Information"
      );
      const latestPatientQuery = query(
        patientColRef,
        orderBy("dateCreated", "desc"), // orderBy to only get the patient which has maximum dateCreated along with limit of one
        limit(1)
      ); // Latest person is being fetched using query on collection of all patients.
      const latestPatientSnapshot = await getDocs(latestPatientQuery);
      const latestPatient = latestPatientSnapshot.docs[0]; // Since we used limit of one, we would only get single document in query. Hence using [0] to get first doc from array of patientsFetched
      const latestPatientUID = latestPatient.data().patientUID; // getting UID of the document fetched of latest-patient
      return latestPatientUID;
    } catch (error) {
      console.log(error);
    }
  };

  const destructureLatestPatientUID = (uid) => {
    // function to break Latest Patient's UID on basis of yearMonth and sequence
    // then return an array of the destructured values.
    const yearAndMonth = uid[1] + uid[2] + uid[3];
    const sequence = uid[4] + uid[5] + uid[6];
    return [yearAndMonth, sequence]; // Example --> ["23A","A01"]
  };

  const latestPatientUid = await getLatestPatientUID(); // getting latest patient UID
  const uidArray = destructureLatestPatientUID(latestPatientUid); // destructuring latest patient's UID. Example --> 'P23HA01' to ['23H',"A01"]
  const currentYearAndMonth = getYearAndMonthForGeneratingUID(); // getting present YearMonth Code for UID. example --> "23H"

  // uidArray has two elements, first one is yearMonth (for example "23H"), second is sequence-code-number (for example "A01")
  if (uidArray[0] !== currentYearAndMonth) {
    // checking if uidArray's first element (i.e. latestPatientUID's year-month Code) is equal to present yearMonthCode
    // if latestPatientUID's year-month-code is not same as present year-month-code
    // then return a new UID of --> "P" + presentYearMonthCode + "A01"
    const newPatientUID = "P" + currentYearAndMonth + "A01";
    return newPatientUID;
  } else {
    // if latestPatientUID's year-month-code is same as present year-month-code,
    // incriment sequence code ("A01") by 1 while keeping the same year-month-code. Example --> P23HA01 to P23HA02, P23HA99 to P23HB01
    const newUidSequence = generateUidSequence(uidArray[1]);
    const newPatientUID = "P" + uidArray[0] + newUidSequence;
    return newPatientUID;
  }
};

export const addNewPatient = async (patientInformation, uid) => {
  // Function to add a New Patient in firestore database

  const patientUID = await generatePatientUID(); // generating new-patient's UID

  try {
    const patientDocRef = collection(
      db,
      "Patients Record",
      "Patients",
      "Basic Information"
    );
    await addDoc(patientDocRef, {
      ...patientInformation,
      patientUID: patientUID,
    }); // adding new-patient's data
  } catch (error) {
    console.log(error);
  }
};

export const updatePatientBasicDetails = async (firestoreUid, data) => {
  try {
    const patientDocRef = doc(
      db,
      "Patients Record",
      "Patients",
      "Basic Information",
      firestoreUid
    );
    await updateDoc(patientDocRef, data);
  } catch (error) {
    console.log(error);
  }
};

export const deletePatient = async () => {
  try {
    const patientDocRef = collection(
      db,
      "Patients Record",
      "Patients",
      "Basic Information"
    );
    const q = query(patientDocRef, where());
  } catch (error) {}
};

export const getAllPatients = async () => {
  const patientsColRef = collection(
    db,
    "Patients Record",
    "Patients",
    "Basic Information"
  );
  const q = query(patientsColRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data()); ///This will create an Array of objects of patientBasicInformation document
};

export const getUserRole = async (user) => {
  const { uid } = user;
  const userDocRef = doc(db, "authentication", uid);
  const userDocument = getDoc(userDocRef);
  const res = (await userDocument).data().role;
  return res;
};

export const fetchPatient = async (uid) => {
  const patientDocRef = doc(
    db,
    "Patients Record",
    "Patients",
    "Basic Information",
    uid
  );
  const patientDetails = (await getDoc(patientDocRef)).data();
  return patientDetails;
};

export const editPatient = async (uid, patientDetails) => {
  const patientDocRef = doc(
    db,
    "/Patients Record/Patients/Basic Information/",
    uid.toString()
  );
  await updateDoc(patientDocRef, patientDetails)
    .then((res) => res)
    .catch((error) => error);
};

export const searchPatientByUID = async (searchParam) => {
  const { paramValue } = searchParam;
  const patientsColRef = collection(
    db,
    "Patients Record",
    "Patients",
    "Basic Information"
  );
  const q = query(patientsColRef, where("patientUID", "==", paramValue));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
  // const res = (await getDoc(patientsColRef)).data();
  // if (res !== undefined) {
  //   const objToAray = (obj) => [obj];
  //   return objToAray(res); ////// this returns an array with an object containing patient details
  // } else {
  //   return res;
  // }
};

export const searchPatientByParam = async (searchParam) => {
  const { paramType, paramValue } = searchParam;
  const pateintsColRef = collection(
    db,
    "Patients Record",
    "Patients",
    "Basic Information"
  );
  const filter = where(paramType, "==", paramValue);
  const q = query(pateintsColRef, filter);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const addStaffMember = async (staffDetails) => {
  const { role, phoneNumber } = staffDetails;

  const staffPath = (role) => {
    switch (role) {
      case "Doctor":
        return `/Clinical Staff/Doctors/${phoneNumber}/Information/Basic Information`;
      case "Nurse":
        return "/Clinical Staff/Nurses";
      case "Technician":
        return "/Clinical Staff/Technicians";

      default:
        break;
    }
  };

  const staffDocRef = doc(db, "Hospital Staff", staffPath(role), phoneNumber);
  await setDoc(staffDocRef, staffDetails);
};

export const getAllDoctors = async () => {
  const doctorsColRef = collection(
    db,
    "Hospital Staff/Clinical Staff/Doctors/"
  );
  const q = query(doctorsColRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const addDoctorAvalability = (timeSlotArray) => {
  /////This function takes a time slot array of objects {date: 2023-04-07 and timeSlot:[{status:'avalable',time:"09:30"}]}
  timeSlotArray.forEach(async (timeSlot) => {
    const { date } = timeSlot;
    const doctorAvalabilityDocRef = doc(
      db,
      "/Appointments/Avalability/1234567890",
      date
    );
    await setDoc(doctorAvalabilityDocRef, timeSlot);
  });
};

export const getAppointmentAvalability = async (docUID) => {
  const appointmentsAvalabilityColRef = collection(
    db,
    "/Appointments/Avalability",
    docUID
  );
  const q = query(appointmentsAvalabilityColRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((slot) => slot.data());
};

export const addAppointmentAvalabilitySlots = async (slotArray) => {
  const doctorUID = "1234567890";
  slotArray.forEach(async ({ slot }) => {
    const appointmentAvalabilityDocRef = doc(
      db,
      "/Appointments/Avalability",
      doctorUID,
      slot.date
    );
    await setDoc(appointmentAvalabilityDocRef, slot);
  });
};

////////////////////////

export const scheduleAppointment = async (appointmentDoc) => {
  try {
    const { doctorUID, appointmentDate } = appointmentDoc;

    const timeSlotDocRef = doc(
      db,
      "Appointments/Avalability/",
      doctorUID,
      appointmentDate
    );

    await runTransaction(db, async (transaction) => {
      const timeSlotSnapshot = await transaction.get(timeSlotDocRef);
      const timeSlotArray = timeSlotSnapshot.data().timeSlots;

      const findAvailableTimeSlot = (timeSlotArray) => {
        return timeSlotArray.find((slot) => slot.status === "available");
      };

      const availableTimeSlot = findAvailableTimeSlot(timeSlotArray);

      if (!availableTimeSlot) {
        throw new Error("No available time slots found.");
      }

      availableTimeSlot.status = "booked";

      const updatedTimeSlotArray = timeSlotArray.map((slot) => {
        if (slot.time === availableTimeSlot.time) {
          return { time: slot.time, status: "booked" };
        }
        return slot;
      });

      transaction.update(timeSlotDocRef, {
        timeSlots: updatedTimeSlotArray,
      });

      const appointmentTime = availableTimeSlot.time;
      const appointmentBookingColRef = collection(
        db,
        "Appointments/Bookings/Upcoming Bookings"
      );
      await addDoc(appointmentBookingColRef, {
        ...appointmentDoc,
        appointmentTime,
      }).then(() => {
        return appointmentTime;
      });
    });
  } catch (error) {
    alert("Error scheduling appointment:\n" + error);
  }
};

export const getAllAppointments = async () => {
  const appointmentsColRef = collection(
    db,
    "/Appointments/Bookings/Upcoming Bookings/"
  );
  const q = query(appointmentsColRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};
