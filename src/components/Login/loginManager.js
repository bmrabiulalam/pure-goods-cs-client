import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

// Initialize Firebase
export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            const {displayName, email, photoURL} = result.user;
            
            const loggedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true,
                message: 'Logged In!'
            }

            return loggedInUser;
        })
        .catch((error) => {
            // var errorMessage = error.message;
            // var email = error.email;
        });
}

export const handleFacebookSignIn = () => {
    var facebookProvider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth()
        .signInWithPopup(facebookProvider)
        .then((result) => {
            const {displayName, email} = result.user;
            
            const loggedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: '',
                success: true,
                message: 'Logged In!'
            }

            return loggedInUser;
        })
        .catch((error) => {
            // var errorMessage = error.message;
            // var email = error.email;
        });
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(() => {
        // Sign-out successful.
        const loggedInUser = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: '',
            success: false,
            message: ''
        }

        return loggedInUser;
      }).catch((error) => {
        // An error happened.
      });
}