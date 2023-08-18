import { initializeApp } from "firebase/app";
import {
  getDatabase,
  set,
  ref,
  onValue,
  remove,
  update,
} from "firebase/database";

const appConfig = initializeApp({
  apiKey: "AIzaSyBhvKgRKffib6imcmxbaeDQHV_DoN_9yZ8",
  authDomain: "morelife-f4ffa.firebaseapp.com",
  databaseURL: "https://morelife-f4ffa-default-rtdb.firebaseio.com",
  projectId: "morelife-f4ffa",
  storageBucket: "morelife-f4ffa.appspot.com",
  messagingSenderId: "377367476689",
  appId: "1:377367476689:web:813c6319c32378cb8848f0",
});

const db = getDatabase(appConfig);

//! get
export const getData = (path, func) => {
  onValue(ref(db, `/${path}`), func);
};

export const getFromID = (path, id, func) => {
  onValue(ref(db, `/${path}/${id}`), func);
};

//! add
export const setData = (path, data) => {
  set(ref(db, `/${path}`), data);
};

//! delete
export const deleteData = (path, id) => {
  remove(ref(db, `/${path}/${id}`));
};

//! update
export const updateData = (path, id, data) => {
  update(ref(db, `/${path}/${id}`), data);
};
