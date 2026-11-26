
import { initializeApp } from 'firebase/app';

import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';

import AsyncStorage from
  '@react-native-async-storage/async-storage';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBuZd1P_dnCn0zZlX5OTsGq-rUoC2485B8",
  authDomain: "weatherwise-e7f1f.firebaseapp.com",
  projectId: "weatherwise-e7f1f",
  storageBucket: "weatherwise-e7f1f.firebasestorage.app",
  messagingSenderId: "1023006363558",
  appId: "1:1023006363558:web:63655e82644cc353e30967",
  measurementId: "G-KSV6V93RYM"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
