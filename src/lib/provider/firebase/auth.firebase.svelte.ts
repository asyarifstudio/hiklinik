import { AuthErrorCodes, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getFirebaseApp } from "./firebase";
import type { ConvexClient } from "convex/browser";
import { useConvexClient, useQuery } from "convex-svelte";
import { api } from "../../../convex/_generated/api";
import type { Doc } from "../../../convex/_generated/dataModel";


const fbApp= getFirebaseApp();
const googleProvider = new GoogleAuthProvider();
var client:ConvexClient;
const fbAuth = getAuth(fbApp);


let state:'AUTHENTICATED'|'LOADING'|'UNAUTHENTICATED' = $state('LOADING');
let user:Doc<"users"> | null | undefined = $state(undefined);
let token:string = $state("")

export const getAuthenticated = ()=>{

    function setAuthenticated(flag:'AUTHENTICATED'|'LOADING'|'UNAUTHENTICATED'){
        state = flag;
    }

    function setUser(_user:Doc<"users"> | null | undefined){
        user = _user;
    }

    function setToken(_token:string){
        token = _token;

    }

    return {
        get state(){
            return state
        },
        get user(){
            return user;
        },
        get token(){
            return token;
        },
        setAuthenticated,
        setUser,
        setToken
    }
};


let authenticated = getAuthenticated();

export function initializeAuth(){
    client = useConvexClient();
    authenticated.setAuthenticated('LOADING')
    fbAuth.onIdTokenChanged((user)=>{
        authenticated.setAuthenticated('LOADING')
        client.setAuth(async (args:{forceRefreshToken:boolean}):Promise<string|undefined|null>=>{
            if(user === undefined || user === null){
                return user;
            }
            else{
                const token = await user.getIdToken(false);
                authenticated.setToken(token);
                return token;
            }

        },(_isAuthenticated:boolean)=>{
           authenticated.setAuthenticated(_isAuthenticated?'AUTHENTICATED':'UNAUTHENTICATED')


        })
    })
}




export async function loginWithGoogle() {
    authenticated.setAuthenticated('LOADING')
    const result = await signInWithPopup(fbAuth,googleProvider);
}

export async function loginWithEmailAndPassword(email:string,password:string) {
    try{
        authenticated.setAuthenticated('LOADING');
        await signInWithEmailAndPassword(fbAuth,email,password);
    }
    catch(e:any){
        console.log(e);
        const errorCode = e.code;
        if(errorCode == AuthErrorCodes.INVALID_LOGIN_CREDENTIALS){
            //attempt to create the user
            try{
                await createUserWithEmailAndPassword(fbAuth,email,password);
            }
            catch(e:any){
                authenticated.setAuthenticated('UNAUTHENTICATED');
                throw e;
            }
            

        }
        //other error
        else{
            authenticated.setAuthenticated('UNAUTHENTICATED');
            throw e;
        }
        
    }
}

export async function sendResetPassword(email:string):Promise<boolean> {
    try{
        const result = await sendPasswordResetEmail(fbAuth,email);
        return true;
    }
    catch(e:any){
        return false;
    }
}

export async function  signout() {
    authenticated.setAuthenticated('LOADING')
    await fbAuth.signOut();
}