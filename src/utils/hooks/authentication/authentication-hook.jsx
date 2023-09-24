import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserRole } from "../../firebase/firebase";
import { setCurrentUser } from "../../../store/user/user.action";

export const useAuthentication = (dispatch) => {
  const authListener = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = await getUserRole(user);
        dispatch(setCurrentUser({ role: role, ...user }));
      } else {
        dispatch(setCurrentUser(null));
      }
    });
  };

  return { authListener };
};
