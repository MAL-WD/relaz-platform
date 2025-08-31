// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithRedirect, getAuth, getRedirectResult } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIDKp4zybRBXeY_zw1vSElj_tzfCDmEyM",
  authDomain: "e-learning-platform-tahri.firebaseapp.com",
  projectId: "e-learning-platform-tahri",
  storageBucket: "e-learning-platform-tahri.appspot.com",
  messagingSenderId: "461416635236",
  appId: "1:461416635236:web:883e6e8649b10d07757871",
  measurementId: "G-078E1NF23Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// google auth
const provider = new GoogleAuthProvider()
const auth = getAuth()
export const authWithGoogle = async ()=>{
    let user =null;
    await signInWithRedirect(auth,provider)
    .then((result)=>{
        user=result.user
    }).catch((err)=>{
        console.log(err)
    })
    return user
}