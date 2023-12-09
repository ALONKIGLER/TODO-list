import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXk8HPjWqylFzvpTx0dZRIbWw-btTO3CA",
  authDomain: "todo-list-b57bf.firebaseapp.com",
  projectId: "todo-list-b57bf",
  storageBucket: "todo-list-b57bf.appspot.com",
  messagingSenderId: "310535383304",
  appId: "1:310535383304:web:2f326dcd41245f080324bd",
  measurementId: "G-RDWRE232W0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
