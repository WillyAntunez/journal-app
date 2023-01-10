import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        
        const {displayName, email, photoURL, uid} = result.user

        return {
            ok: true,
            displayName, 
            email,
            photoURL,
            uid,
        }
    } catch (error) {
        // console.error(error);

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            errorMessage,
            ok: false,
        }
    }
}

export const registerUserWithEmailPassword = async ({email, password, displayName}) => {

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp
        
        // TODO: Actualizar el usuario o el displayname en firebase
        await updateProfile( FirebaseAuth.currentUser, {
            displayName
        });

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

        
    } catch (error) {
        // console.error(error);

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            errorMessage,
            ok: false,
        }
    }

};


// export const startSignIn
export const loginWithEmailPassword = async ({email, password}) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const {displayName, uid, photoURL} = resp.user;
        
        return {
            ok: true,
            email, 
            uid, 
            displayName,
            photoURL
        }

        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        return {
            errorMessage,
            ok: false
        }
    }
}

export const logoutFirebase = async () => {

    return await FirebaseAuth.signOut();

}