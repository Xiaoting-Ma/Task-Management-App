import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendPasswordResetEmail } from 'firebase/auth';

/**
 * Register a new user with email, password, and name.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} name - The user's display name.
 * @returns {Promise<UserCredential>} The user credential object.
 */
export const register = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name }); // update user info
    return userCredential;
  } catch (error) {
    console.error('Error registering new user:', error);
    throw error;
  }
};

/**
 * Login an existing user with email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<UserCredential>} The user credential object.
 */
export const login = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

/**
 * Logout the currently authenticated user.
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};

/**
 * Listen for changes to the authentication state.
 * @param {function} callback - The callback function to handle auth state changes.
 * @returns {function} Unsubscribe function.
 */
export const authStateListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};


export const resetPassword = async (email) => {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};