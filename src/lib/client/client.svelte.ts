import { getAuthenticated, loginWithEmailAndPassword, loginWithGoogle, sendResetPassword, signout } from "$lib/provider/firebase/auth.firebase.svelte";
import { getContext, setContext } from "svelte";
import type { Doc } from "../../convex/_generated/dataModel";

export const client = {
    auth:{
        loginWithGoogle:loginWithGoogle,
        logout:signout,
        getAuth:getAuthenticated,
        loginWithEmailAndPassword:loginWithEmailAndPassword,
        sendResetPassword:sendResetPassword
    },
    version:'1.0.0'
}