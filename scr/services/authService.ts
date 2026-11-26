
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth } from './firebase';

// REGISTER USER
export const registerUser = async (
  email: string,
  password: string,
) => {
  const result = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );

  return result.user;
};

// LOGIN USER
export const loginUser = async (
  email: string,
  password: string,
) => {
  const result = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );

  return result.user;
};

// LOGOUT USER
export const logoutUser = async () => {
  await signOut(auth);
};
