import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDosxTcg9WXEU-PjGgEon1B-KKY93GxBt8',
  authDomain: 'studio-voix-d-afrique.firebaseapp.com',
  projectId: 'studio-voix-d-afrique',
  storageBucket: 'studio-voix-d-afrique.firebasestorage.app',
  messagingSenderId: '695455306217',
  appId: '1:695455306217:web:2a4565fcc5dad4d5337b78',
};

// Avoid re-initializing on hot reload
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
