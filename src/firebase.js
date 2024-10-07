// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword,
        getAuth,
        signInWithEmailAndPassword,
        signOut} from 'firebase/auth';
import {addDoc,
        collection,
        getFirestore} from 'firebase/firestore';
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUGHhAGDNmFICCsjhSWQhCQbZrJ2kul9w",
  authDomain: "netflix-80c95.firebaseapp.com",
  projectId: "netflix-80c95",
  storageBucket: "netflix-80c95.appspot.com",
  messagingSenderId: "7645063115",
  appId: "1:7645063115:web:3c0bcfd58bf9b91631b84e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async(name , email , password)=>{
  try {
    const response = await createUserWithEmailAndPassword(auth , email , password)
    const user = response.user;
    await addDoc(collection(db,'user'),{
      uid:user.uid,
      name,
      authProvider:'local',
      email
    })
  } catch (error) {
      console.log(error)
      toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}


const login = async(email , password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}


const logout = ()=>{
  signOut(auth)
}

export {auth,db,login,signup,logout}