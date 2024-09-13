import { initializeApp,getApps, type FirebaseApp } from 'firebase/app';
import {PUBLIC_FIREBASE_CLIENT_CONFIG} from '$env/static/public'

let firebaseApp:FirebaseApp | undefined;

if(!getApps().length){
   
    firebaseApp = initializeApp(JSON.parse(PUBLIC_FIREBASE_CLIENT_CONFIG));
}
else{
    firebaseApp = getApps()[0]
}


export function getFirebaseApp(){
    if(!getApps().length){
   
        firebaseApp = initializeApp(JSON.parse(PUBLIC_FIREBASE_CLIENT_CONFIG));
    }
    else{
        firebaseApp = getApps()[0]
    }

    return firebaseApp;
}

export {firebaseApp}