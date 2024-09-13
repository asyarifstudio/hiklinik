import { v } from "convex/values";
import { internalQuery, mutation, query } from "./../_generated/server";

export const getByEmail = query({
    args:{email:v.string()},
    handler:async(ctx,{email})=>{
        const user = await ctx.db.query("users")
                                .filter((q)=>q.eq(q.field('email'),email)).first();

        
        return user;
    }
})

export const addAuthenticatedUser = mutation({
    handler:async(ctx)=>{
        const userAuth = await ctx.auth.getUserIdentity();
        if(userAuth){

            //check if user already exist
            const existingUser =  await ctx.db.query("users")
            .filter((q)=>q.eq(q.field('email'),userAuth!.email!)).first();

            if(existingUser === null){
                const id = await ctx.db.insert("users",{email:userAuth!.email!,role:"CLIENT"})
                console.log(`addAuthenticatedUser: add user with Id ${id}`)
            }
            
            
        }
        
    }
})


export const getAuthenticatedUser = query({
    handler:async(ctx,{})=>{
        
        const userAuth = await ctx.auth.getUserIdentity();
        console.log(`authenticated user ${JSON.stringify(userAuth?.email)}`)
       
        const user = await ctx.db.query("users")
        .filter((q)=>q.eq(q.field('email'),userAuth?.email)).first();

        return user;
    }
})


export const getUserIdentity = internalQuery(
   {
    handler:async(ctx)=>{
        const userAuth = await ctx.auth.getUserIdentity();
        if(userAuth){
            const user = await ctx.db.query("users")
                .filter((q)=>q.eq(q.field('email'),userAuth?.email)).first();
                return user;
        }
        else{
            return null;
        }
    }
   }
)