import { makeMigration, startMigrationsSerially } from "convex-helpers/server/migrations";
import { internalMutation } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

export const migration = makeMigration(internalMutation,{
    migrationTable:"migrations"
})

export const migration1 = migration({
    table:"users",
    migrateOne:async(ctx,doc)=>{
        
    }
})


export default internalMutation(async (ctx)=>{
    await startMigrationsSerially(ctx,[
        //internal.migrations.migration1
    ])
})