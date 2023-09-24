export const firebaseAuthError = (error) => {
  switch (error.code) {
    case "auth/claims-too-large":
      alert(
        "The claims payload provided to setCustomUserClaims() exceeds the maximum allowed size of 1000 bytes."
      );
      break;
    case "auth/email-already-exists":
      alert(
        "The provided email is already in use by an existing user. Each user must have a unique email."
      );
      break;
    case "auth/id-token-expired":
      alert("The provided Firebase ID token is expired.");
      break;
    case "auth/id-token-revoked":
      alert("The Firebase ID token has been revoked.");
      break;
    case "auth/insufficient-permission":
      alert(
        "The credential used to initialize the Admin SDK has insufficient permission to access the requested Authentication resource. Refer to Set up a Firebase project for documentation on how to generate a credential with appropriate permissions and use it to authenticate the Admin SDKs."
      );
      break;
    case "auth/internal-error":
      alert(
        "The Authentication server encountered an unexpected error while trying to process the request. The error message should contain the response from the Authentication server containing additional information. If the error persists, please report the problem to our Bug Report support channel."
      );
      break;
    case "auth/invalid-argument":
      alert(
        "An invalid argument was provided to an Authentication method. The error message should contain additional information."
      );
      break;
    case "auth/invalid-claims":
      alert(
        "The custom claim attributes provided to setCustomUserClaims() are invalid."
      );
      break;
    case "auth/invalid-continue-uri":
      alert("The continue URL must be a valid URL string.");
      break;
    case "auth/invalid-creation-time":
      alert("The creation time must be a valid UTC date string.");
      break;
    case "auth/user-not-found":
      alert(
        "There is no existing user record corresponding to the provided identifier."
      );
      break;
    case "auth/invalid-email":
      alert("This email does not exisits");
      break;
    case "auth/wrong-password":
      alert("Incorrect Password");
      break;
    case "auth/too-many-requests":
      alert(
        "You have been trying to login with this email from so long. Please wait before continuing again"
      );
      break;
    default:
      alert(error.code);
  }
};
