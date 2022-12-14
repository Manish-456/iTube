import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {

  apiKey : process.env.REACT_APP_APIKEY,
  authDomain : process.env.REACT_APP_AUTHDOMAIN,
  projectId : process.env.REACT_APP_PROJECTID,
  storageBucket : process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId : process.env.REACT_APP_MESSAGINGSENDERID,
  appId : process.env.REACT_APP_APPID

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()

export const provider = new GoogleAuthProvider()



export default app;