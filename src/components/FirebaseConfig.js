import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";

const firebaseApp = {
  apiKey: "AIzaSyBhvKgRKffib6imcmxbaeDQHV_DoN_9yZ8",
  authDomain: "morelife-f4ffa.firebaseapp.com",
  projectId: "morelife-f4ffa",
};

export const InitApp = initializeApp(firebaseApp);

const db = getFirestore(InitApp);

export const DataCollectionRef = (table) => {
  return collection(db, table);
};

export const GetData = async (ref) => {
  const data = await getDocs(ref);
  return data
};

export const AddData = async (ref, obj) => {
  const data = await addDoc(ref, obj);
};
