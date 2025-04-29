import { auth } from "@/app/firebase/config";
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export const signin = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('signedin', user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export const signout = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('signed out');
  }).catch((error) => {
    // An error happened.
  });
}

export const signup = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export const recover = (email: string) => { }

