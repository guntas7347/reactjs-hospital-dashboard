export const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export const dateObjToFormattedDate = (date) => {
  const dateObject = new Date(date); // JavaScript months are 0-based, so August is 7
  const options = { year: "numeric", month: "long", day: "numeric" };
  return dateObject.toLocaleDateString("en-US", options);
};

export const dateObjToDate = (date) => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const rearrangeObjectKeys = (object, keyOrder) => {
  // keyOrder should be an array.
  var newObject = {};
  keyOrder.forEach((key) => {
    newObject = { ...newObject, [key]: object[key] };
  });
  return newObject;
};

export const convertTo12HourFormat = (time24) => {
  var [hours, minutes] = time24.split(":");
  let period = "AM";

  if (parseInt(hours) >= 12) {
    period = "PM";
    if (hours !== "12") {
      hours = String(parseInt(hours) - 12);
    }
  }

  if (hours === "0") {
    hours = "12";
  }

  return `${hours}:${minutes} ${period}`;
};

export const getYearAndMonthForGeneratingUID = () => {
  // This function generate year and month for generating Patient UID.
  // Example, for May 1970, It will return a string of 70D where 70 is last two digits of year and D is month number to albhabet

  const monthNumber = new Date().getMonth() + 1; // getting current month number
  const monthToAlphabet = (month) => {
    // Function to convert month number to alphabet. Example --> 1 to January or 11 to November
    const allAlphabets = "ABCDEFGHIJKLMN"; // Defining a string containing first 12 english alphabets in order
    return allAlphabets[month - 1]; // Returning the month alphabet using index. Month number is decreased by one because index starts from 0.
  };
  const year = new Date().getFullYear().toString().slice(2, 4); //  getting current year, then converting it to String, then getting the last two digits of current year string. for example for "2023", getting "23"
  const month = monthToAlphabet(monthNumber); // converting current month number to Alphabet using custom function. Example - 2->Feb, 8->Aug
  return year + month; // returning combined string of year string and month alphabet. Ex -> "23" + "A" = "23A"
};

const alphabetLetterIncreaser = (givenAlphabet) => {
  // Function to incriment a given Alphabet by one. For example A to B.
  const allAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Defining a string containing all english alphabets in order
  const givenAlphabetIndex = allAlphabets.indexOf(givenAlphabet); // Getting index of a given Alphabet in the defined string
  const successorAlphabetIndex = givenAlphabetIndex + 1; // Incrimenting the index by 1.
  const successorAlphabet = allAlphabets[successorAlphabetIndex]; // obtaining new incrimented alphabet by using incrimented index on the defined string
  return successorAlphabet; // Returning the incrimented Alphabet
};

export const generateUidSequence = (sequenceCode) => {
  // This function takes latest patient's UID's sequence code
  // sequence code is last 3 digits of a patient's UID
  // For example - If UID=P23HA01, then A01 is the sequence code
  const sequenceNumberString = sequenceCode.slice(1, 3); //seperating sequence Number from Code A01 and getting '01'
  const sequenceAlphabet = sequenceCode[0]; // seperating alphabet from code A01 and getting A
  const sequenceNumber = parseInt(sequenceNumberString, 10); // converting Sequence Number String to Integer

  if (sequenceNumber < 99) {
    // check if sequence number is smaller than 99

    const newSequenceNumber = sequenceNumber + 1; //If true, increase sequence number by 1
    const newSequenceNumberString = newSequenceNumber
      .toString() // converting newly increased sequence number to string
      .padStart(2, "0"); // converting newly increased number string to two digit. if already 2 digit, do nothing, else add zero infront of the single digit number
    const newSequenceCode = sequenceAlphabet + newSequenceNumberString;
    return newSequenceCode; // returning new sequence code
  } else {
    // If false, increase sequence alphabet by one and add '01' to the alphabet
    const newSequenceCode = alphabetLetterIncreaser(sequenceAlphabet) + "01";
    return newSequenceCode; // Returning the new Sequence Code
  }
};

export const renameObjectKeyForPatientProfile = (key) => {
  switch (key) {
    case "patientUID":
      return "Patient UID";

    case "fullName":
      return "Patient's Name";

    case "fathersName":
      return "Father's Name";

    case "gender":
      return "Gender";

    case "dob":
      return "Date of Birth";

    case "address":
      return "Address";

    default:
      break;
  }
};
